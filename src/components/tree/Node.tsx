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

  const folderHasContent = ():boolean => (!!(node.children && node.children.length > 0));

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
  const handleFolderClick = (e: { stopPropagation: () => void; }) => {
    if (folderHasContent()) {
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  // Single click
  const handleSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, nodeId:string) => {
    e.preventDefault();

    if (isSelected()) {
      setSelectedId('');
    } else {
      setSelectedId(nodeId);
    }
  };

  const shouldShowPlusMinus = () => (!folderHasContent() ? { opacity: 0, cursor: 'default' }
    : {});

  const shouldHaveFolderPointerCursor = () => (!folderHasContent() ? { cursor: 'default' }
    : {});

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

  const getFolderIconClass = () => (node.tag === 'HEAD' ? 'private-folder-icon' : 'public-folder-icon');

  const treePadding = {
    paddingLeft: (`${newPadding}px`),
  };

  return (
    <>
      {node.type === 'Folder' ? (
        <>
          <li>
            <div onClick={(e) => handleSelection(e, node.id)} style={treePadding} className={`tree-file-folder ${isSelected() ? 'tree-item-selected' : ''}`}>
              <span
                style={shouldShowPlusMinus()}
                className={`plus-minus ${getPlusMinusClass()}`}
                onClick={handleFolderClick}
              />
              <span onClick={handleFolderClick} style={shouldHaveFolderPointerCursor()} className={`folder ${getFolderIconClass()}`} />
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
