import Vue from 'vue';
import _ from 'lodash';

import VueGroup from '../coms/vue-group.vue';
import VueNode from '../coms/vue-node.vue';

/**
 * 渲染render
 * @param {Object} item 渲染对象（就是mockdata中的每一项）
 * @param {String} type 渲染类型
 * @param {Array} canvasDatas 渲染节点对应的渲染类型
 */
const render = (item, type, parent = null, canvasDatas = null) => {

  let vueCon;

  if (item.render) {
    switch (typeof item.render) {
      case 'string':
        vueCon = Vue.extend({
          template: item.render,
          props:{
            itemData: {
              type: Object,
              required: true,
            }
          },
        });
        break;

      case 'object':
        vueCon = Vue.extend(item.render);
        break;

      default:
        throw Error(`${type}存在render属性，应该为string或者object类型，现在是${typeof render}`);
    }
  } else {
    switch (type) {
      case 'group':
        vueCon = Vue.extend(VueGroup);
        break;

      case 'node':
        vueCon = Vue.extend(VueNode);
        break;

      default:
        break;
    }
    
  }
  
  let canvasDataIndex = canvasDatas.findIndex((canvasItem)=>{
    return canvasItem.id === item.id;
  })

  if (canvasDataIndex === -1) {
    console.warn(`canvas.add${type}方法出错`);
    return null;
  }

  const canvasData = canvasDatas[canvasDataIndex];

  let propsData = {
    itemData: item,
    canvasData
  }

  if (type === 'node') {
    propsData.canvasNode = canvasData;
  
    const nodeCon = new vueCon({
      parent: parent,
      propsData
    });
    nodeCon.$butterfly = {
      type: type
    }
    // 暂时不用指向parent 节点的emit支持
    // nodeCon.$parent = parent
    // 打通组件的$emit事件传输
    nodeCon._events = parent._events;
    nodeCon.$mount();
    
    return nodeCon;
  } else {
    const Con = new vueCon({
      propsData
    })
    // 暂时不用指向parent  edge和group的emit支持
    // Con.$parent = parent
    // 打通组件的$emit事件传输
    Con._events = parent._events;
    Con.$mount();
    
    return Con;
  }

};

const addGroupsCom = (canvasRoot, canvasGroups, groups, parent) => {
  groups.map((item,index) => {
    const id = item.id;
    if (!id) {
      console.warn(`groups的${index}不含ID属性，请检查格式`);
      return;
    }

    const dom = canvasRoot.querySelector(`*[id^='bf_group_${item.id}']`);

    if (!dom) {
      return;
    }

    let groupCon = render(item, 'group', parent, canvasGroups);

    dom.append(groupCon.$el);
  });
};

const addNodesCom = (canvasRoot, canvasNodes, nodes, parent) => {
  nodes.map((item,index) => {
    if (_.isArray(item)) {
      return ;
    }
    const id = item.id;
    if (!id) {
      console.warn(`nodes的${index}不含ID属性，请检查格式`);
      return;
    }

    const dom = canvasRoot.querySelector(`*[id^='bf_node_${item.id}']`);

    if (!dom) {
      return;
    }

    let nodeCon = render(item, 'node', parent, canvasNodes);

    dom.append(nodeCon.$el);
  })
};

const addEdgesCom = (canvasRoot, canvasEdges, edges, parent) => {
  edges.map((item,index) => {
    const id = item.id;
    if (!id) {
      console.warn(`edges的${index}不含ID属性，请检查格式`);
      return;
    }

    if (item.render) {
      const dom = canvasRoot.querySelector(`*[id^='edge_label_${item.id}']`);

      if (!dom) {
        return;
      }

      let edgeCon = render(item, 'edge', parent, canvasEdges);

      dom.append(edgeCon.$el);
    }
  })
};

export {
  addEdgesCom,
  addGroupsCom,
  addNodesCom
};
