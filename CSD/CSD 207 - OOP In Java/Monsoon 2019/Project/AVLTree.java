import java.awt.*;

/* This is a class to implement AVL tree */

class AVLNode extends TreeNode
{
  protected int height = 1;
  protected int key;  

	@Override
	protected void setLeftNode(TreeNode newLeft) {
		this.left = newLeft;
	}

	@Override
	protected void setRightNode(final TreeNode newRight) {
		this.right = newRight;
	}

	AVLNode(final int val)
	{
		value = val;
	}
}

public class AVLTree extends TreeType
{

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
		((AVLNode)rootNode).searchNodes(value, Color.RED);
	}

	// Insertion function
	void binaryInsert(int key) {
		insertElement(key);
	}

  // Utility functions

  // function to return the maximum of two integers
  int max(int a, int b){
    return (a > b) ? a : b;
  }

  // function to calculate the height of the tree
  int height(AVLNode root){
	if (root == null)
		return 0; 
	return root.height; 
  }

  // Utitlity function to right rotate subtree
  AVLNode rightRotate(AVLNode y){
	AVLNode x = (AVLNode)y.left; 
	AVLNode T2 = (AVLNode)x.right; 

	// Perform rotation 
	x.right = y; 
	y.left = T2; 

	// Update heights 
	x.height = max(height((AVLNode)x.left), height((AVLNode)x.right)) + 1; 
	y.height = max(height((AVLNode)x.left), height((AVLNode)x.right)) + 1;
	
	// Returning the root
	return x; 
	}

// Utility function to right rotate subtree 
AVLNode leftRotate(AVLNode x) { 
	AVLNode y = (AVLNode)x.right; 
	AVLNode T2 = (AVLNode)x.left; 

	// Perform rotation 
	y.left = x; 
	x.right = T2;  

	// Update heights 
	x.height = max(height((AVLNode)(x.left)), height((AVLNode)(y.right))) + 1; 
	y.height = max(height((AVLNode)(x.left)), height((AVLNode)(y.right))) + 1;
	
	// Returning the root
	return y;
} 

	// Function to find the balance factor of the tree
	int getBalance(AVLNode N) { 
		if (N == null) 
			return 0; 
	
		return height((AVLNode)(N.left)) - height((AVLNode)(N.right)); 
	}  

	// Insertion function 
	void insertElement(AVLNode root, int val){
		rootNode = insert(root, val); 
	}
	public AVLNode insert(AVLNode root, int val) {
		/* 1. Perform BST Insertion */ 
		// If the tree is empty
		if(root == null)
			root = new AVLNode(val);
		
		if(val < root.value)
			root.left = insert((AVLNode)root.left, val); 
		else if(val > root.value)
			root.right = insert((AVLNode)root.right, val);
		// If same, then nothing
		else 
			return root; 
		/* 2. Update the height of the ancestor */ 
		root.height = 1 + max(height((AVLNode)root.left), height((AVLNode)root.right)); 
			
		/* If the node became unbalanced */
		int balance = getBalance(root); 

		// Left Left Case
		if(balance > 1 && val < root.left.value)
			return rightRotate(root); 
		
		// Right Right Case 
		if(balance < -1 && val > root.right.value)
			return leftRotate(root); 
		
		// Left Right Case 
		if(balance > 1 && val > root.left.value){
			root.left = leftRotate((AVLNode)root.left); 
			return rightRotate(root); 
		}
		// Right Left Case
		if(balance < -1 && val > root.right.value){
			root.right = rightRotate((AVLNode)root.left); 
			return leftRotate(root); 		
		}

		return root;
	}

	AVLNode minValueNode(AVLNode node)  
    {  
        AVLNode current = node;  
  
        /* loop down to find the leftmost leaf */
        while (current.left != null)  
        current = (AVLNode)current.left;  
  
        return current;  
    }  

	AVLNode deleteNode(AVLNode root, int key)  
    {  
        // STEP 1: PERFORM STANDARD BST DELETE  
        if (root == null)  
            return root;  
  
        // If the key to be deleted is smaller than  
        // the root's key, then it lies in left subtree  
        if (key < root.value)  
            root.left = deleteNode((AVLNode)root.left, key);  
  
        // If the key to be deleted is greater than the  
        // root's key, then it lies in right subtree  
        else if (key > root.value)  
            root.right = deleteNode((AVLNode)root.right, key);  
  
        // if key is same as root's key, then this is the node  
        // to be deleted  
        else
        {  
  
            // node with only one child or no child  
            if ((root.left == null) || (root.right == null))  
            {  
                AVLNode temp = null;  
                if (temp == root.left)  
                    temp = (AVLNode)root.right;  
                else
                    temp = (AVLNode)root.left;  
  
                // No child case  
                if (temp == null)  
                {  
                    temp = root;  
                    root = null;  
                }  
                else // One child case  
                    root = temp; // Copy the contents of  
                                // the non-empty child  
            }  
            else
            {  
  
                // node with two children: Get the inorder  
                // successor (smallest in the right subtree)  
                AVLNode temp = minValueNode((AVLNode)root.right);  
  
                // Copy the inorder successor's data to this node  
				root.value = temp.value;
				root.curr_x = temp.curr_x;
				root.curr_y = temp.curr_y; 
				root.color = temp.color; 
  
                // Delete the inorder successor  
                root.right = deleteNode((AVLNode)root.right, temp.value);  
            }  
		}

		// If the tree had only one node then return  
        if (root == null)  
            return root;  
  
        // STEP 2: UPDATE HEIGHT OF THE CURRENT NODE  
        root.height = max(height((AVLNode)root.left), height((AVLNode)root.right)) + 1;  
  
        // STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to check whether  
        // this node became unbalanced)  
        int balance = getBalance(root);  
  
        // If this node becomes unbalanced, then there are 4 cases  
        // Left Left Case  
        if (balance > 1 && getBalance((AVLNode)root.left) >= 0)  
            return rightRotate((AVLNode)root);  
  
        // Left Right Case  
        if (balance > 1 && getBalance((AVLNode)root.left) < 0)  
        {  
            root.left = leftRotate((AVLNode)root.left);  
            return rightRotate((AVLNode)root);  
        }  
  
        // Right Right Case  
        if (balance < -1 && getBalance((AVLNode)root.right) <= 0)  
            return leftRotate((AVLNode)root);  
  
        // Right Left Case  
        if (balance < -1 && getBalance((AVLNode)root.right) > 0)  
        {  
            root.right = rightRotate((AVLNode)root.right);  
            return leftRotate((AVLNode)root);  
        }  
  
		return root;  
		
	}  

	public void deleteElement(final TreeNode root, final int val) {
			rootNode = deleteNode((AVLNode)root, val);
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
	// PreOrder Traversal of the tree
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
		// Returning height instead 
		return Integer.toString(((AVLNode)root).height);
	}

// Overriding all the abstract functions
	@Override
	public void deleteElement(int value) {
		deleteElement(rootNode, value);
	}

	@Override
	public void insertElement(int value) {
		insertElement((AVLNode)rootNode, value);
	}

	@Override
	public String inOrder() {
		return inOrder((AVLNode)rootNode);
	}

	@Override
	public String preOrder() {
		return preOrder((AVLNode)rootNode);
	}

	@Override
	public String postOrder() {
		return postOrder((AVLNode)rootNode);
	}


}
