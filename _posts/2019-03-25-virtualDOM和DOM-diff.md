---
layout:     post
title:      virtualDOM和DOM-diff
subtitle:   虚拟DOM和DOM diff算法
date:       2019-03-25
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - virtual DOM diff
---

用对象描述DOM结构
```
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
```

创建虚拟DOM，返回虚拟节点
```
function createElement(type, props, children) {
  return new Element(type, props, children);
}
```
用createElement创建虚拟DOM
```
createElement('div', {class: 'active'}, ['text'])])
//传入type,props,children
```
render方法转换虚拟DOM为真实DOM
```
function render(domObj) {
  let el = document.createElement(domObj.type);
  
  for (let key in domObj.props) {
    setAttr(el, key, domObj.props[key]);
  }

  domObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child);
    el.appendChild(child); });
  
  return el;
}

function setAttr(node, key, value) {
  switch(key) {
    case 'value':
      if (node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

function renderDom(el, target) {
  target.appendChild(el);
}
```
DOM diff
```
function diff(oldTree, newTree) {
    // 声明变量patches用来存放补丁的对象
    let patches = {};
    // 第一次比较应该是树的第0个索引
    let index = 0;
    // 递归树 比较后的结果放到补丁里
    walk(oldTree, newTree, index, patches);

    return patches;
}

function walk(oldNode, newNode, index, patches) {
    // 每个元素都有一个补丁
    let current = [];

    if (!newNode) { // rule1
        current.push({ type: 'REMOVE', index });
    } else if (isString(oldNode) && isString(newNode)) {
        // 判断文本是否一致
        if (oldNode !== newNode) {
            current.push({ type: 'TEXT', text: newNode });
        }

    } else if (oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attr = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attr).length > 0) {
            current.push({ type: 'ATTR', attr });
        }
        // 如果有子节点，遍历子节点
        diffChildren(oldNode.children, newNode.children, patches);
    } else {    // 说明节点被替换了
        current.push({ type: 'REPLACE', newNode});
    }
    
    // 当前元素确实有补丁存在
    if (current.length) {
        // 将元素和补丁对应起来，放到大补丁包中
        patches[index] = current;
    }
}

function isString(obj) {
    return typeof obj === 'string';
}

function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 判断老的属性中和新的属性的关系
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]; // 有可能还是undefined
        }
    }

    for (let key in newAttrs) {
        // 老节点没有新节点的属性
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

// 所有都基于一个序号来实现
let num = 0;

function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, index) => {
        walk(child, newChildren[index], ++num, patches);
    });
}

// 默认导出
export default diff;
```
 patch补丁更新
```
let allPatches;
let index = 0;  // 默认哪个需要打补丁

function patch(node, patches) {
    allPatches = patches;
    
    // 给某个元素打补丁
    walk(node);
}

function walk(node) {
    let current = allPatches[index++];
    let childNodes = node.childNodes;

    // 先序深度，继续遍历递归子节点
    childNodes.forEach(child => walk(child));

    if (current) {
        doPatch(node, current); // 打上补丁
    }
}

function doPatch(node, patches) {
    // 遍历所有打过的补丁
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTR':
                for (let key in patch.attr) {
                    let value = patch.attr[key];
                    if (value) {
                        setAttr(node, key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = patch.newNode;
                newNode = (newNode instanceof Element) ? render(newNode) : document.createTextNode(newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
            default:
                break;
        }
    });
}

export default patch;
```
