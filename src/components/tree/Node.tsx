/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
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

    return 23;
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

  const treePadding = {
    paddingLeft: (`${newPadding}px`),
  };

  const getPlusMinusClass = () => {
    if (isOpen) {
      if (selectedId === node.id) {
        return 'white-minus-icon white-icon';
      }

      return 'black-minus-icon black-icon';
    }

    if (selectedId === node.id) {
      return 'white-plus-icon white-icon';
    }

    return 'black-plus-icon black-icon';
  };

  return (
    <>
      {node.type === 'Folder' ? (
        <>
          <li>
            <div onClick={(e) => handleSelection(e, node.id)} style={treePadding} className={`tree-file-folder ${isSelected() ? 'tree-item-selected' : ''}`}>
              <span
                className={`plus-minus ${getPlusMinusClass()}`}
                onClick={handleFolderClick}
              />
              <span onClick={handleFolderClick} className={`folder ${node.tag === 'HEAD' ? 'private-folder-icon' : 'public-folder-icon'}`} />
              {node.tag?.toLowerCase()}
            </div>
            <SmoothCollapse expanded={isOpen}>
              {node.children && node.children.length > 0
                    && (
                    <ul>
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
            </SmoothCollapse>
          </li>
        </>
      ) : (
        <li>
          <div style={treePadding} onClick={(e) => handleSelection(e, node.id)} className={`tree-file tree-file-folder ${isSelected() ? 'tree-item-selected' : ''}`}>
            <span className="file file-icon" />
            {node.text}
          </div>
        </li>
      )}
    </>
  );
};

export default Node;
