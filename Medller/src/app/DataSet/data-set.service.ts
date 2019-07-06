import { Injectable, OnInit } from '@angular/core';
import { Network, Timeline, DataSet, Node, Edge, IdType , DataGroup } from 'vis';
import { Observable, Subject } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';


export interface Message {
  author: string;
  message: string;
}


@Injectable()
export class DataSetService implements OnInit {
  groupOptions = {};


  networkRequests: Array<Object> = [];
  networkResponses: Array<Object> = [];


  Groups: Array<string> = [];

  ClientId = 'Client';
  SSLId = 'SSL';
  NonSSLId = 'NonSSL';

  nodes: DataSet<Node> = new DataSet([]);
  edges: DataSet<Edge> = new DataSet([]);

  public messages: Subject<any>;



  screenResolution = 'size 692x692\non\n';

  constructor() {
    // this.connectToWebSocket();
  }

  onClickMethod() {


  }


  onClickNode(nodeIds: Array<any>) {
    for (const nodeId of nodeIds) {
      const node = this.nodes.get(nodeId);
      const _group : DataGroup = node['group'];

      const groups = this.getGroupsAndSubGroups(_group);
      console.log('groups', groups);
      for (const g of groups) {
        if (g === _group) {
          continue;
        }
        this.groupOptions['groups'][g]['hidden'] = !this.groupOptions['groups'][g]['hidden'];

      }

      const group2 : IdType[]= this.nodes.getIds({
        filter: function (item) {

          if (groups.indexOf(item.group) > -1) {
            return true;
          }
          return false;
        }
      });
      // this.nodes.update(group2);
      const updatedNodes = [];
      for (const index of group2) {
        updatedNodes.push({ 'id': index });
      }
      this.nodes.update(updatedNodes);




    }
  }
  getScreenShare(callback) {
    // const listner = this.wsService.getDeviceScreen(callback);
  }

  setTouchListener(callback) {
    // this.wsService.sendTouchToDevice(callback);

  }


  sendTouch(event, x, y) {
    // this.wsService.setTouchEvent(event, x, y);
  }

  getEdgeBetweenNodes(node1, node2) {
    return this.edges.get().filter(function (edge) {
      return (edge.from === node1 && edge.to === node2) || (edge.from === node2 && edge.to === node1);
    });
  }

  get getDataSet(): { nodes: DataSet<Node>, edges: DataSet<Node> } {
    return { nodes: this.nodes, edges: this.edges };
  }

  get getGroups() {

    return this.traverseJSONObject(this.dummyGroupData);

  }


  get dummyGroupData() {
    const data = [
      {
        'Client': [
          {
            'SSL': [
              {
                'SSLDomain': [{ 'SSLMethod': [] }]
              }

            ]
          },
          {
            'NonSSL': [
              {
                'NonSSLDomain': [{ 'NonSSLMethod': [] }]
              }

            ]
          },
        ]
      },

    ];

    return data;
  }

  getGroupsAndSubGroups(search) {
    const data = this.dummyGroupData;
    const searchNode = [this.searchIntraverseJSONObject(data, search)];
    if (searchNode == null) {
      return [];
    } else {
      return this.traverseJSONObject(searchNode);
    }
  }

  traverseJSONObject(data: Array<Object>) {

    let returnData = [];
    for (const _data of data) {
      const keys = (Object.keys(_data));
      for (const key of keys) {
        returnData = returnData.concat(this.traverseJSONObject(_data[key]));
        returnData.push(key);
      }
    }

    return returnData;
  }

  searchIntraverseJSONObject(data: Array<Object>, search: string) {

    for (const _data of data) {
      const keys = (Object.keys(_data));
      for (const key of keys) {
        if (key === search) {
          return _data;
        }
        const returnData = this.searchIntraverseJSONObject(_data[key], search);
        if (returnData !== null) {
          return returnData;
        }
      }
    }

    return null;
  }

  get getDataSetOptions() {
    return this.groupOptions;
  }

  setDataSetOptions() {
    console.log('options');
    const groups = this.traverseJSONObject(this.dummyGroupData);
    console.log(groups);
    let groupOptions = {};
    for (const _group of groups) {
      groupOptions[_group] = {
        hidden: false
      };

    }
    groupOptions = { groups: groupOptions };
    console.log(groupOptions);
    this.groupOptions = groupOptions;
  }


  nodeDataFetcher() {

    this.attachDomain('Server', true);

  }

  ngOnInit() {

  }

  attachDomain(title, isSSL, delay = 300) {
    const id = title;
    const node = {
      id: id,
      label: title,
      size: 20,
      group: 'SSLDomain',
      margin: 20,
      shape: 'image',
      font: {
        'color': '  #fff'
      },
      image: {
        'unselected': 'assets/server.png'
      },

      color: {

        'border': '#000',
        'background': '#f3374e'
      }
    };
    if (isSSL) {
      if (!this.nodes.get(id)) {
        this.joinNodes(id, this.SSLId);
      }

    } else {
      if (!this.nodes.get(id)) {
        this.joinNodes(id, this.NonSSLId);
      }
    }
    // this.nodes.update(node);



  }

  joinNodes(node1, node2) {
    this.edges.add({ 'from': node1, 'to': node2, color: { 'color': '#fff' } }  as Edge);
  }

  createMethod(methodName, siteName, ssl: boolean) {
    const method = {
      id: methodName + siteName, label: methodName,
      size: 30,
      margin: 20,
      shape: 'image',
      group: (ssl === true) ? 'SSLMethod' : 'NonSSLMethod',
      font: {
        'color': '  #fff'
      },
      image: {
        'unselected': 'assets/method.png',
      },

      color: {

        'border': '#000',
        'background': '#f3374e'
      }
    };
    // this.nodes.update(method);

    if (this.getEdgeBetweenNodes(siteName, methodName + siteName).length !== 1) {
      this.joinNodes(siteName, methodName + siteName);

    } else {
      // setTimeout(() => {
      //   this.joinNodes(siteName, methodName + siteName);
      // }, 3000);
    }


  }

  createClient() {
    const title = 'Client';
    const client = {
      id: this.ClientId, label: title,
      size: 50,
      margin: 80,
      shape: 'image',
      group: 'Client',
      font: {
        'color': '  #fff'
      },
      image: {
        'unselected': 'assets/mobile.png'
      },

      color: {

        'border': '#000',
        'background': '#f3374e'
      },


    };
    // this.nodes.add(client);
  }

  createSSL() {
    const title = 'Secure';
    const SSLNode = {
      id: this.SSLId, label: title,
      size: 30,
      margin: 20,
      shape: 'image',
      font: {
        'color': '  #fff'
      },
      group: 'SSL',
      image: {
        'unselected': 'assets/secure.png',
      },

      color: {

        'border': '#000',
        'background': '#f3374e'
      },


    };
    // this.nodes.add(SSLNode);
    this.joinNodes(this.ClientId, this.SSLId);
  }

  createNonSSL() {
    const title = 'Insecure';
    const SSLNode = {
      id: this.NonSSLId, label: title,
      size: 30,
      margin: 20,
      shape: 'image',
      font: {
        'color': '  #fff'
      },
      group: 'NonSSL',
      image: {
        'unselected': 'assets/insecure.svg'
      },

      color: {

        'border': '#000',
        'background': '#f3374e'
      },


    };
    // this.nodes.add(SSLNode);
    this.joinNodes(this.ClientId, this.NonSSLId);
  }



  initialiseCompulsoryNodes() {
    this.setDataSetOptions();
    this.createClient();
    this.createNonSSL();
    this.createSSL();


    // Dummy Data Insertion
    // this.addDomainsDummy();
    // this.addMethodsDummy();
  }

  addRequestFromSocket(data) {
    const scheme = data['scheme'];
    const host = data['host'];

    this.networkRequests.push(data);
    // this.networkRequests.splice(this.networkRequests.length , 0, data);
    // this.attachDomain(host, (scheme === 'https') ? true : false, 0);

  }

  public trackBy(index, object) {
    return object ? object.id : undefined;
  }

  addDomainsDummy() {
    // this.attachDomain('gaana.com', true, 2000);
    // this.attachDomain('api.gaana.com', true, 4200);
    // this.attachDomain('magicbricks.com', true);
    // this.attachDomain('columbia.com', false);
    // this.attachDomain('timesinternet.in', false);

  }

  addMethodsDummy() {
    this.createMethod('GET', 'gaana.com', true);
    this.createMethod('POST', 'gaana.com', true);
    // this.createMethod('OPTIONS', 'gaana.com', 16);
    this.createMethod('GET', 'api.gaana.com', true);
    // this.createMethod('PATCH', 'magicbricks.com', 12, 800);
    // this.createMethod('DELETE', 'magicbricks.com', 14, 1000);
    this.createMethod('POST', 'api.gaana.com', true);
    // this.createMethod('OPTIONS', 'magicbricks.com', 16, 1800);
    let gaana = 5;
    let _gaana = 9;
    gaana += 1;
    _gaana += 3;
    this.createMethod('GET', 'gaana.com', true);
    this.createMethod('POST', 'gaana.com', true);
    this.createMethod('GET', 'api.gaana.com', true);
    this.createMethod('POST', 'api.gaana.com', true);

  }
}
