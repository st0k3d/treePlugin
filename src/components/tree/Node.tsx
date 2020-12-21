/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { TreeNode } from '../../Models';

interface Props {
    node: TreeNode;
    padding:number;
    selectedId:string;
    setSelectedId: React.Dispatch<React.SetStateAction<string>>
}

const Node: React.FunctionComponent<Props> = (props:Props) => {
  const {
    node, padding, selectedId, setSelectedId,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = () => selectedId === node.id;

  const getPadding = ():number => {
    if (node.type === 'File') {
      return 42;
    }

    if (node.tag && (node.tag === 'HEAD' || node.tag === 'BODY')) {
      return 15;
    }

    return 25;
  };

  const newPadding = padding + getPadding();

  // Double click
  const handleFolderClick = (e:any) => {
    e.stopPropagation();
    if (node.type === 'Folder') {
      setIsOpen(!isOpen);
    }
  };

  // Single click
  const handleSelection = (e:any, nodeId:string) => {
    e.preventDefault();

    if (isSelected()) {
      setSelectedId('');
    } else {
      setSelectedId(nodeId);
    }
  };

  const fileStyle = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap' as 'nowrap',
    cursor: 'auto',
    paddingLeft: (`${newPadding}px`),
    fontSize: '.85em',
  };

  const plusMinusStyle = {
    marginRight: '.75em',
    cursor: 'pointer',
  };

  const folderStyle = {
    marginRight: '.4em',
    cursor: 'pointer',
  };

  const folderDiv = {
    fontSize: '.85em',
    paddingLeft: (`${newPadding}px`),
  };

  const fileIconStyle = {
    marginRight: '.7em',
  };

  const getPlusMinusClass = () => {
    if (isOpen) {
      if (selectedId === node.id) {
        return 'white-minus-icon';
      }

      return 'black-minus-icon';
    }

    if (selectedId === node.id) {
      return 'white-plus-icon';
    }

    return 'black-plus-icon';
  };

  return (
    <>
      {node.type === 'Folder' ? (
        <>
          <li
            className="tree-view-node"
          >
            <div onClick={(e) => handleSelection(e, node.id)} style={folderDiv} className={`tree-item ${isSelected() ? 'tree-item-selected' : ''}`}>
              <span
                style={plusMinusStyle}
                className={getPlusMinusClass()}
                onClick={handleFolderClick}
              />
              <span style={folderStyle} onClick={handleFolderClick} className={node.tag === 'HEAD' ? 'private-folder-icon' : 'public-folder-icon'} />
              {' '}
              {node.tag?.toLowerCase()}
            </div>
            {isOpen && node.children && node.children.length > 0
                    && (
                    <ul className="tree-view">
                      {node.children.map((k, j) => (
                        <Node
                          node={k}
                          key={j}
                          padding={newPadding}
                          selectedId={selectedId}
                          setSelectedId={setSelectedId}
                        />
                      ))}
                    </ul>
                    )}
          </li>
        </>
      ) : (
        <li className="tree-view-node">
          <div style={fileStyle} onClick={(e) => handleSelection(e, node.id)} className={`tree-item ${isSelected() ? 'tree-item-selected' : ''}`}>
            <span style={fileIconStyle} className="file-icon" />
            {node.text}
          </div>
        </li>
      )}
    </>
  );
};

export default Node;
