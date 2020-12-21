import { v4 as uuidv4 } from 'uuid';
import { TreeNode } from './Models';

export const parseHtmlStringToElement = (html:string):HTMLElement => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.firstElementChild as HTMLElement;
};

export const domWalker = (node:HTMLElement, array:TreeNode[], parentDepth:number, depth:number):
TreeNode[] => {
  const treeNodeObj:TreeNode = {
    id: `node-${parentDepth}-${depth}-${uuidv4()}`,
  };

  // This is an element
  if (node.tagName) {
    if (node.tagName !== 'HTML') {
      treeNodeObj.type = 'Folder';
      treeNodeObj.tag = node.tagName;
      treeNodeObj.children = [];
    }
  }

  // This is a text node that contains alphanumeric characters
  else if (node.nodeType === 3 && node.textContent?.match(/[a-z]/i)) {
    treeNodeObj.type = 'File';
    treeNodeObj.text = node.textContent.replace('\n', '').trim();
  }

  if (Object.prototype.hasOwnProperty.call(treeNodeObj, 'type')) {
    array.push(treeNodeObj);
  }

  node = node.firstChild as HTMLElement;
  parentDepth += 1;
  while (node) {
    if (treeNodeObj.children) {
      treeNodeObj.children = domWalker(node, treeNodeObj.children, parentDepth, depth);
    } else {
      array = domWalker(node, array, parentDepth, depth);
    }
    node = node.nextSibling as HTMLElement;
    depth += 1;
  }

  return array;
};
