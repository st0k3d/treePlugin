import React, { useState } from 'react';
import { TreeNode } from '../Models';
import Node from './tree/Node';

interface Props {
    treeData: TreeNode[];
}

const Tree: React.FunctionComponent<Props> = (props:Props) => {
  const [selectedId, setSelectedId] = useState<string>('');

  const { treeData } = props;

  const treeStyle = {
    marginTop: '1em',
  };

  return (
    <div style={treeStyle}>
      <ul className="tree-view">
        {treeData.map((k, j) => (
          <Node
            node={k}
            key={j}
            padding={0}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tree;
