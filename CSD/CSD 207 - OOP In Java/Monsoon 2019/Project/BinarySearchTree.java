import java.awt.*;

/* This is a class to implement binary search tree */
 
class BinaryNode extends TreeNode
{
	protected int height = 1;
	@Override
	protected void setLeftNode(TreeNode newLeft) {
		this.left = newLeft;
	}

	@Override
	protected void setRightNode(TreeNode newRight) {
		this.right = newRight;
	}

	BinaryNode(int val)
	{
		value = val;
	}
}

public class BinarySearchTree extends TreeType
{
	int c = 1; 
	@Override
	public TreeNode getRoot() {
		// TODO Auto-generated method stub
		return rootNode;
	}

	@Override
	public void sortTree() {
		// TODO Auto-generated method stub

	}

	@Override
	public void search(int value) {
		((BinaryNode)rootNode).searchNodes(value, Color.RED);
	}

	// Insertion function
	void binaryInsert(int key) {
		insertElement(key);
	}

	  // function to calculate the height of the tree
	  int height(BinaryNode root){
		if (root == null)
			return 0; 
		return root.height; 
	  }

	public void insertElement(int value) {
	
    // If the tree is empty
		if(rootNode == null)
			rootNode = new BinaryNode(value);
		else
		{
      // Creating a new node
	  TreeNode curr = rootNode;
			BinaryNode en = new BinaryNode(value);
			// c = ((BinaryNode)rootNode).count; 
			int inserted = 0;

			while(inserted != 1)
			{
				if(value < curr.value)
				{
					if(curr.leftNode() != null)
					curr = curr.leftNode();
					else
					{
						curr.setLeftNode(en);
						inserted = 1;
						c++; 
					}
				}
				else
				{
					if(curr.rightNode() != null)
					curr = curr.rightNode();
					else
					{
						curr.setRightNode(en);
						inserted = 1;
						c++; 
					}
				}
			}
		}
	}

	// BinarySearchTree Deletion
	TreeNode deleteElement(TreeNode root, int val){
		root = deleteR(root, val);
		c--; 
		return root;
	}
	public TreeNode deleteR(TreeNode root, int val) {
			// If the tree is empty
			if (root == null)
				return root;

			// If the the value is less than the root then move to the left side
			if(val < (int) root.value)
				root.left = deleteR(root.left, val);

			// If the the value is greater than the root then move to the right side
			else if (val > (int) root.value)
				root.right = deleteR(root.right, val);

			// if we have arrived at the leaf
			else{
				if (root.left == null)
				{
					root = root.right;
					return root;
				}
				else if (root.right == null)
				{
					root = root.left;
					return root;
				}
				else
				{
					// Moving the data from the inorder Successor to the current position
					TreeNode n = root; 
					n = inOrderSuccessor(root.right); 
					root.value = (int)n.value;
					root.curr_x = (int)n.curr_x;
					root.curr_y = (int)n.curr_y;
					root.right = deleteR(root.right, (int)root.value);
				}
			}

			// Returning the current root
			return root;
	}


	// New method of inorder traversal 
	public static TreeNode inOrderSuccessor(TreeNode root){
		if(root.left == null)
			return root; 
		else
			return inOrderSuccessor(root.left); 
	}

	// Inorder Traversal of the tree
	public String inOrder(TreeNode root) {
		// String to be returned
		String inString = "";

		// Empty Tree
		if(root == null)
			return "";

		// check the left child
		inString += inOrder(root.left);

		inString += root.value + " ";

		// Check the right child
		inString += inOrder(root.right);

		// print the current root value
		return inString;
	}

	// Preorder Traversal of the tree
	public String preOrder(TreeNode root) {
		// String to be returned
		String preString = "";

		// Empty Tree
		if(root == null)
			return "";

		preString += root.value + " ";

		// check the left child
		preString += preOrder(root.left);

		// Check the right child
		preString += preOrder(root.right);

		// print the current root value
		return preString;
	}

	// Postorder Traversal of the tree
	public String postOrder(TreeNode root) {
		// String to be returned
		String postString = "";

		// Empty Tree
		if(root == null)
			return "";

		// check the left child
		postString += postOrder(root.left);

		// Check the right child
		postString += postOrder(root.right);

		postString += root.value + " ";

		// print the current root value
		//return postString;
		return Integer.toString(c); 
	}

// Overriding all the abstract functions
	@Override
	public void deleteElement(int value) {
		rootNode = deleteElement(rootNode, value);
	}

	@Override
	public String inOrder() {
		// TODO Auto-generated method stub
		return inOrder(rootNode);
	}

	@Override
	public String preOrder() {
		// TODO Auto-generated method stub
		return preOrder(rootNode);
	}

	@Override
	public String postOrder() {
		// TODO Auto-generated method stub
		return postOrder(rootNode);
	}

}
