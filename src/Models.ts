export interface TreeNode {
    id:string,
    type?: 'Folder'| 'File',
    tag?:string;
    text?: string;
    children?:TreeNode[];
}
