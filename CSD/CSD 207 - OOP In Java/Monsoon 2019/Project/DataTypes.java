import java.awt.*;

abstract class TreeNode{

	protected int value = 0;
	protected Color color = Color.WHITE;
	public Color defaultColor = Color.WHITE;
	public Color textColor = Color.black;


	protected TreeNode 	left = null,
						right = null;

	public int 	curr_x=-1,
				curr_y=-1; //Only to be used by Start.java. Don't play with these
	protected long	timeMillis = 0; //Animations
	protected boolean moving = false;

	public long move_s = -1;

	public int getValue()
	{
		return value;
	}

	public TreeNode leftNode()
	{
		return left;
	}

	public TreeNode rightNode()
	{
		return right;
	}

	public Color getColor()
	{
		return color;
	}

	public void setColor(Color c)
	{
		color = c;
	}

	public void setInMotion()
	{
		timeMillis = System.currentTimeMillis();
		moving = true;
	}

	public long getSince()
	{
		return timeMillis;
	}

	public boolean isMoving()
	{
		return moving;
	}

	public void stop(int x1, int y1)
	{
		curr_x = x1;
		curr_y = y1;

		moving = false;
	}

	void searchNodes(final int val, final Color cr)
	{

		if(value == val)
		{
      // System.out.println(val);
			color = cr;
		}
		else
		color = defaultColor;
		

		if(left != null)
		((AVLNode)left).searchNodes(val, cr);


		if(right != null)
		((AVLNode)right).searchNodes(val, cr);
	}

	protected abstract void setLeftNode(TreeNode newLeft);

	protected abstract void setRightNode(TreeNode newRight);

}

abstract class TreeType
{
	protected TreeNode rootNode = null;

	public abstract TreeNode getRoot();

	public abstract void 	sortTree();

	public abstract void 	search(int value); //If this element was being searched for, set color to java.awt.Color.YELLOW else if active element(being moved around or something), set to java.awt.Color.BLACK, else set to NULL;

	public abstract void 	insertElement(int value);

	public abstract void 	deleteElement(int value);

	public abstract String	inOrder();

	public abstract String	preOrder();

	public abstract String	postOrder();
}
