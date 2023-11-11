import java.util.*;
import java.awt.*;

class RedBlackNode extends TreeNode {
	// Constructors
	RedBlackNode( int theElement ) {
		this( theElement, null, null );
	}
	 
	RedBlackNode( int theElement, RedBlackNode lt, RedBlackNode rt ) {
		value  = theElement;
		left     = lt;
		right    = rt;
		color    = Color.BLACK;
	}
	 
	int          colorer;      // Color

	@Override
	protected void setLeftNode(TreeNode newLeft) {
		left = newLeft;
	}

	@Override
	protected void setRightNode(TreeNode newRight) {
		right = newRight;
	}
}

public class RBlackTree extends TreeType {
     
    private RedBlackNode rootNode = null;
    private static RedBlackNode nullNode;
    static         // Static initializer for nullNode
    {
        nullNode = new RedBlackNode( -9999 );
        nullNode.left = nullNode.right = nullNode;
	}
	
    // Used in insert routine and its helpers
    private static RedBlackNode current;
    private static RedBlackNode parent;
    private static RedBlackNode grand;
	private static RedBlackNode great;
	

    /**
     * Construct the tree.
     */
    public RBlackTree( ) {
        rootNode      = null;
    }
     
    /**
     * Compare item and t.value, using compareTo, with
     * caveat that if t is rootNode, then item is always larger.
     * This routine is called if is possible that t is rootNode.
     * If it is not possible for t to be rootNode, use compareTo directly.
     */
    private final int compare( int item, RedBlackNode t ) {
        if( t == rootNode )
            return 1;
        else
            return (item > t.value ? 1 : item < t.value ? -1 : 0);
	}
	
    public void insert( int item ) {

		if(rootNode == null)
		{
			rootNode = new RedBlackNode(item);
			return;
		}
        current = parent = grand = rootNode;
        nullNode.value = item;
         
        while( item != current.value ) {
            great = grand; grand = parent; parent = current;
            current = item < current.value ?
                (RedBlackNode)current.left : (RedBlackNode)current.right;
             
            // Check if two red children and change it accordingly 
            if( current.left.color == Color.RED && current.right.color == Color.RED )
                handleReorient(item);
		}
		
        current = new RedBlackNode( item, null, null );
         
        // Attach to parent
        if( item < parent.value )
            parent.left = current;
        else
            parent.right = current;
        handleReorient( item );
    }
     
    /**
     * Remove from the tree.
     * @param x the item to remove.
     * @throws UnsupportedOperationException if called.
     */
    public void remove( int x ) {
        throw new UnsupportedOperationException( );
    }
     
    /**
     * Find the smallest item  the tree.
     * @return the smallest item or null if empty.
     */
    public int findMin( ) {
        if( isEmpty( ) )
            return -999999;
         
        RedBlackNode itr = (RedBlackNode)rootNode.right;
         
        while( itr.left != nullNode )
            itr = (RedBlackNode)itr.left;
         
        return itr.value;
    }
     
    /**
     * Find the largest item in the tree.
     * @return the largest item or null if empty.
     */
    public int findMax( ) {
        if( isEmpty( ) )
            return 999999;
         
        RedBlackNode itr = (RedBlackNode)rootNode.right;
         
        while( itr.right != nullNode )
            itr = (RedBlackNode)itr.right;
         
        return itr.value;
    }
     
    /**
     * Find an item in the tree.
     * @param x the item to search for.
     * @return the matching item or null if not found.
     */
    public int find( int x ) {
        nullNode.value = x;
        current = (RedBlackNode)rootNode.right;
         
        for( ; ; ) {
            if( x < current.value )
                current = (RedBlackNode)current.left;
            else if( x > current.value )
                current = (RedBlackNode)current.right;
            else if( current != nullNode )
                return current.value;
            else
                return -999999;
        }
    }
     
    /**
     * Make the tree logically empty.
     */
    public void makeEmpty( ) {
        rootNode.right = nullNode;
    }
     
    /**
     * Test if the tree is logically empty.
     * @return true if empty, false otherwise.
     */
    public boolean isEmpty( ) {
        return rootNode.right == nullNode;
    }
     
    /**
     * Internal routine that is called during an insertion
     * if a node has two red children. Performs flip and rotations.
     * @param item the item being inserted.
     */
    private void handleReorient( int item ) {
        // Do the color flip
        current.color = Color.RED;
        current.left.color = Color.BLACK;
        current.right.color = Color.BLACK;
         
        if( parent.color == Color.RED )   // Have to rotate
        {
            grand.color = Color.RED;
            if( ( item < grand.value ) !=
                    ( item > parent.value ))
                parent = rotate( item, grand );  // Start dbl rotate
            current = rotate( item, great );
            current.color = Color.BLACK;
        }
        rootNode.right.color = Color.BLACK; // Make root black
    }
     
    /**
     * Internal routine that performs a single or double rotation.
     * Because the result is attached to the parent, there are four cases.
     * Called by handleReorient.
     * @param item the item in handleReorient.
     * @param parent the parent of the root of the rotated subtree.
     * @return the root of the rotated subtree.
     */
    private RedBlackNode rotate( int item, RedBlackNode parent ) {
        if(item < parent.value)
            {
				parent.left = item < parent.left.value ?
                rotateWithLeftChild( (RedBlackNode)parent.left )  :  // LL
				rotateWithRightChild( (RedBlackNode)parent.left ) ;  // LR
				return (RedBlackNode)parent.left;
			}
        else
            {
				parent.right = item < parent.right.value  ?
                rotateWithLeftChild( (RedBlackNode)parent.right ) :  // RL
				rotateWithRightChild( (RedBlackNode)parent.right );  // RR
				return (RedBlackNode)parent.right;
			}
    }
     
    /**
     * Rotate binary tree node with left child.
     */
    private static RedBlackNode rotateWithLeftChild( RedBlackNode k2 ) {
        RedBlackNode k1 = (RedBlackNode)k2.left;
        k2.left = k1.right;
        k1.right = k2;
        return k1;
    }
     
    /**
     * Rotate binary tree node with right child.
     */
    private static RedBlackNode rotateWithRightChild( RedBlackNode k1 ) {
        RedBlackNode k2 = (RedBlackNode)k1.right;
        k1.right = k2.left;
        k2.left = k1;
        return k2;
    }
     
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
		// TODO Auto-generated method stub
		rootNode.searchNodes(value, Color.YELLOW);
	}

	@Override
	public void insertElement(int value) {
		insert(value);
	}

	@Override
	public void deleteElement(int value) {
		// TODO Auto-generated method stub
		deleteElement(value);
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
		return postString;
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