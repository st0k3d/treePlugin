import React, { useState } from 'react';
import Tree from '../Tree';
import FileDropper from '../FileDropper';
import Modal from '../Modal';
import { TreeNode } from '../../Models';
import { ALLOWED_FILE_TYPES, MAX_ALLOWED_FILE_UPLOAD } from '../../constants';
import { parseHtmlStringToElement, domWalker } from '../../Utils';

const RootView: React.FunctionComponent = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const readTextFileAsync = (file:any):
  Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target != null) {
        resolve(e.target.result);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file, 'UTF-8');
  });

  const getFileAsString = async (files:Blob[]):Promise<string> => {
    const file = await readTextFileAsync(files[0]) as string;
    return file;
  };

  const convertFileToTreeNode = async (files:Blob[]):Promise<void> => {
    const htmlString = await getFileAsString(files);
    const htmlElement = parseHtmlStringToElement(htmlString);
    const treeNodes = domWalker(htmlElement, [], 0, 1);
    setTreeData(treeNodes);
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const renderTree = ():JSX.Element => (
    <Tree treeData={treeData} />
  );

  const fileDropperProps = {
    fileDropHandler: (files:Blob[]):void => { convertFileToTreeNode(files); },
    accept: ALLOWED_FILE_TYPES,
    maxFiles: MAX_ALLOWED_FILE_UPLOAD,
    multiple: false,
    message: 'Drag and drop an HTML file, or click to select HTML files',
  };

  const modalProps = {
    body: renderTree(),
    title: 'Title',
    setIsOpen: setIsModalOpen,
    isOpen: isModalOpen,
  };

  return (
    <div>
      <div
        className="file-dropper-wrapper"
      >
        <FileDropper {...fileDropperProps} />
      </div>
      <Modal {...modalProps} />
    </div>
  );
};

export default RootView;
