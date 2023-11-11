import javax.swing.*;

import java.awt.*;
import java.awt.event.*;
import java.awt.image.*;

class Start extends JFrame implements Runnable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public static final int anim_duration = 1500;

	BufferedImage	bufferImage = (BufferedImage)createImage(1000, 1000);

	Graphics 		drawGraphics,
					bufferGraphics;

	JPanel			drawPane			=		new JPanel(),
					cPane				=		new JPanel(),
					controlPane			=		new JPanel(),
					leftControlPanel	=		new JPanel(),
					rightControlPanel	=		new JPanel(),
					infoPanel			=		new JPanel(),
					buttonsPanel		=		new JPanel();

	int 			vert_dist = 100;

	TreeType		tr 	=	null,
					BSTTree = new BinarySearchTree(),
					AVlTree = new AVLTree(), // Make this of type AVL Tree after Class is made
					RBlTree = new RBlackTree(); // Make this of type RBL Tree after corresponding class is made

	JButton		 	searchButton = new JButton("Search"),
					addButton = new JButton("Add"),
					deleteButton = new JButton("Delete");

	JRadioButton	AVLTree = new JRadioButton("AVL Tree"),
					BSTree = new JRadioButton("BST Tree"),
					RBTree = new JRadioButton("Red Black Tree");

	ButtonGroup		radioGroup = new ButtonGroup();

	JTextField		nodeField = new JTextField(20);

	JTextArea		inOrderText = new JTextArea(2, 20),
					preOrderText = new JTextArea(2, 20),
					postOrderText = new JTextArea(2, 20);

	JLabel			inOrderLabel = new JLabel("InOrder:"),
					preOrderLabel = new JLabel("PreOrder:"),
					postOrderLabel = new JLabel("PostOrder:");


	Color BGColor = Color.BLACK;//new Color(33, 33, 33, 0);


	@Override
	public void run(){

		if(bufferImage == null);
		bufferImage = (BufferedImage)createImage(1000, 1000);

		bufferGraphics = bufferImage.getGraphics();
		drawGraphics = drawPane.getGraphics();

		while(true)
		{
			try {
				Thread.sleep(16);
				drawGraphics = drawPane.getGraphics();
				this.update(drawGraphics);
			}
			catch(Exception e)
			{
				e.printStackTrace();
				System.out.println(e.getMessage());
				return;
			}
			catch(Error r)
			{
				r.printStackTrace();
				System.out.println(r.getMessage());
				return;
			}
		}
	}

	public void update(Graphics g)
	{
		bufferImage = (BufferedImage)createImage(drawPane.getWidth(), drawPane.getHeight());
		bufferGraphics = bufferImage.getGraphics();

		bufferGraphics.setFont(new Font("serif", Font.BOLD, 15));
		bufferGraphics.setColor(Color.GRAY);
		bufferGraphics.fillRect(0, 0, bufferImage.getWidth(), bufferImage.getHeight());

		processTree();

		// bufferGraphics.setColor(Color.BLUE);
		// bufferGraphics.drawLine(5, 5, 5, bufferImage.getHeight() -5);
		// bufferGraphics.drawLine(5, 5, bufferImage.getWidth()-5, 5);
		// bufferGraphics.drawLine(5, bufferImage.getHeight() -5, bufferImage.getWidth() -5, bufferImage.getHeight() -5);
		// bufferGraphics.drawLine(bufferImage.getWidth() -5, 5, bufferImage.getWidth() -5, bufferImage.getHeight() -5);

		g.drawImage(bufferImage, 0, 0, Color.GRAY, drawPane);
	}

	public void processTree()
	{
		if(tr == null)
		tr = new BinarySearchTree();

		TreeNode l = tr.getRoot();

		if(l == null)
		return;

		processNode(l, drawPane.getWidth() / 2, 50, drawPane.getWidth() / 4);

	}

	public void processNode(TreeNode tn, int x, int y, int d_x)
	{

		int c_x = x, c_y = y;

		if(tn.curr_x == -1 || tn.curr_y == -1){
			tn.curr_x = x;
			tn.curr_y = y - 10;
			c_y = tn.curr_y;
		}
		
		if(tn.isMoving())
		{
			long timeSince = tn.getSince();
			long timeNow = System.currentTimeMillis();

			if(timeNow >= timeSince + anim_duration)
			{
				tn.stop(x, y);
			}
			else
			{
				double progress = ((double)(timeNow - timeSince))/anim_duration;
				double move = Math.sin(progress * (Math.PI / 2));
				c_x = (int)(tn.curr_x - (tn.curr_x - x) * move);
				c_y = (int)(tn.curr_y - (tn.curr_y - y) * move);
			}
		}
		else if(tn.curr_x != x || tn.curr_y != y)
		{
			tn.setInMotion();
		}

		TreeNode 	left = tn.leftNode(),
					right = tn.rightNode();

		Color col = tn.getColor();
		col = col == null ? Color.GRAY : col;

		Graphics2D bGraphics2d = (Graphics2D)bufferGraphics;

		bGraphics2d.setStroke(new BasicStroke(3));

		bGraphics2d.setColor(BGColor);
		bGraphics2d.fillOval(c_x - 27, c_y - 27, 54, 54);

		bGraphics2d.setColor(col);
		bGraphics2d.fillOval(c_x - 25, c_y - 25, 50, 50);

		bGraphics2d.setColor(BGColor);
		bGraphics2d.drawString(tn.value + "", c_x - 5, c_y - 5);

		if(left != null)
		{
			bufferGraphics.drawLine(x, y, x - d_x, y + vert_dist);
			processNode(left, x - d_x, y + vert_dist, (d_x / 2));
		}

		if(right != null)
		{
			bufferGraphics.drawLine(x, y, x + d_x, y + vert_dist);
			processNode(right, x + d_x, y + vert_dist, (d_x / 2));
		}
	}

	Start()
	{
		setBackground(BGColor);
		tr = BSTTree;

		cPane.setLayout(new BorderLayout());
		cPane.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
		cPane.setBackground(BGColor);
		controlPane.setLayout(new BoxLayout(controlPane, BoxLayout.X_AXIS));
		controlPane.setBackground(BGColor);

		leftControlPanel.setLayout(new BoxLayout(leftControlPanel, BoxLayout.Y_AXIS));
		leftControlPanel.setBackground(Color.GRAY);
		leftControlPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

		radioGroup.add(BSTree);
		radioGroup.add(AVLTree);
		radioGroup.add(RBTree);

		BSTree.setBackground(Color.GRAY);
		AVLTree.setBackground(Color.GRAY);
		RBTree.setBackground(Color.GRAY);

		BSTree.addActionListener(new ActionListener(){
			@Override
			public void actionPerformed(ActionEvent e) {
				tr = BSTTree;
			}
		});

		AVLTree.addActionListener(new ActionListener(){
			@Override
			public void actionPerformed(ActionEvent e) {
				tr = AVlTree;
			}
		});

		RBTree.addActionListener(new ActionListener(){
			@Override
			public void actionPerformed(ActionEvent e) {
				tr = RBlTree;
			}
		});

		BSTree.setSelected(true);

		leftControlPanel.add(BSTree);
		leftControlPanel.add(AVLTree);
		leftControlPanel.add(RBTree);

		rightControlPanel.setLayout(new BoxLayout(rightControlPanel, BoxLayout.Y_AXIS));
		rightControlPanel.setBackground(BGColor);
		rightControlPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

		buttonsPanel.setLayout(new FlowLayout());
		buttonsPanel.setBackground(BGColor);
		buttonsPanel.setAlignmentX(CENTER_ALIGNMENT);

		nodeField.setBackground(Color.GRAY);
		nodeField.setBorder(BorderFactory.createCompoundBorder(
			BorderFactory.createLineBorder(Color.GRAY, 2),
			BorderFactory.createEmptyBorder(6, 10, 6, 10)
		));
		nodeField.setForeground(BGColor);
		nodeField.addKeyListener(new KeyListener(){
			@Override
			public void keyTyped(KeyEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void keyPressed(KeyEvent e) {
				if(e.getKeyCode() == KeyEvent.VK_ENTER)
				{
					addButton.doClick();
					nodeField.setText("");
				}
			}

			@Override
			public void keyReleased(KeyEvent e) {
				// TODO Auto-generated method stub

			}

		});

		rightControlPanel.add(nodeField);

		addButton.setBackground(BGColor);
		addButton.setForeground(Color.GRAY);
		addButton.setBorder(BorderFactory.createCompoundBorder(
			BorderFactory.createLineBorder(Color.GRAY, 2),
			BorderFactory.createEmptyBorder(6, 10, 6, 10)
		));


		searchButton.setBackground(BGColor);
		searchButton.setForeground(Color.GRAY);
		searchButton.setBorder(BorderFactory.createCompoundBorder(
			BorderFactory.createLineBorder(Color.GRAY, 2),
			BorderFactory.createEmptyBorder(6, 10, 6, 10)
		));


		deleteButton.setBackground(BGColor);
		deleteButton.setForeground(Color.GRAY);
		deleteButton.setBorder(BorderFactory.createCompoundBorder(
			BorderFactory.createLineBorder(Color.GRAY, 2),
			BorderFactory.createEmptyBorder(6, 10, 6, 10)
		));



		addButton.addActionListener(new ActionListener(){

			@Override
			public void actionPerformed(ActionEvent e) {
				int val = Integer.parseInt(nodeField.getText());
				tr.insertElement(val);

				inOrderText.setText(tr.inOrder());
				preOrderText.setText(tr.preOrder());
				postOrderText.setText(tr.postOrder());
			}
		});

		deleteButton.addActionListener(new ActionListener(){

			@Override
			public void actionPerformed(ActionEvent e) {
				int val = Integer.parseInt(nodeField.getText());
				tr.deleteElement(val);

				inOrderText.setText(tr.inOrder());
				preOrderText.setText(tr.preOrder());
				postOrderText.setText(tr.postOrder());
			}
		});

		searchButton.addActionListener(new ActionListener(){
			@Override
			public void actionPerformed(ActionEvent e) {
				int val = Integer.parseInt(nodeField.getText());
				tr.search(val);
			}
		});

		buttonsPanel.add(addButton);
		buttonsPanel.add(searchButton);
		buttonsPanel.add(deleteButton);

		rightControlPanel.add(buttonsPanel);

		controlPane.add(Box.createHorizontalGlue());
		controlPane.add(leftControlPanel);
		controlPane.add(Box.createHorizontalGlue());
		controlPane.add(rightControlPanel);
		controlPane.add(Box.createHorizontalGlue());

		infoPanel.setLayout(new BoxLayout(infoPanel, BoxLayout.Y_AXIS));
		infoPanel.setBackground(BGColor);
		infoPanel.setBorder(BorderFactory.createEmptyBorder(0, 10, 0, 0));
		infoPanel.setAlignmentY(JPanel.CENTER_ALIGNMENT);
		infoPanel.setAlignmentX(JPanel.LEFT_ALIGNMENT);


		inOrderText.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
		inOrderText.setLineWrap(true);
		inOrderText.setBackground(Color.GRAY);
		inOrderText.setForeground(Color.WHITE);
		inOrderText.setEditable(false);

		inOrderLabel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
		inOrderLabel.setForeground(Color.GRAY);
		inOrderLabel.setHorizontalAlignment(0);
		infoPanel.add(inOrderLabel);
		infoPanel.add(inOrderText);


		preOrderText.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
		preOrderText.setLineWrap(true);
		preOrderText.setBackground(Color.GRAY);
		preOrderText.setForeground(Color.WHITE);
		preOrderText.setEditable(false);

		preOrderLabel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
		preOrderLabel.setForeground(Color.GRAY);
		preOrderLabel.setHorizontalAlignment(0);
		infoPanel.add(preOrderLabel);
		infoPanel.add(preOrderText);


		postOrderText.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
		postOrderText.setLineWrap(true);
		postOrderText.setBackground(Color.GRAY);
		postOrderText.setForeground(Color.WHITE);
		postOrderText.setEditable(false);

		postOrderLabel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
		postOrderLabel.setForeground(Color.GRAY);
		postOrderLabel.setHorizontalAlignment(0);
		infoPanel.add(postOrderLabel);
		infoPanel.add(postOrderText);



		cPane.add(drawPane, BorderLayout.CENTER);
		cPane.add(controlPane, BorderLayout.SOUTH);

		cPane.add(infoPanel, BorderLayout.EAST);

		setContentPane(cPane);
		setSize(1000, 1000);
		setTitle("Tree Visualizer");
		setVisible(true);
		setDefaultCloseOperation(EXIT_ON_CLOSE);

		bufferImage = (BufferedImage)createImage(1000, 1000);

		bufferGraphics = bufferImage.getGraphics();
		drawGraphics = drawPane.getGraphics();
		new Thread(this).start();
	}

	public static void main(String args[])
	{
		new Start();
	}

}
