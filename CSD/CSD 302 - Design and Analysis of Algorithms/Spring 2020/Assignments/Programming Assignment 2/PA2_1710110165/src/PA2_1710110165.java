/*
Written by Kabir Kanha Arora
CSD 302 - Design and Analysis of Algorithms
Programming Assignment 2
FUNCTION APPROXIMATION/COMPRESSION
 */

import java.io.BufferedReader;
import java.io.InputStreamReader;

import static java.lang.System.arraycopy;

public class PA2_1710110165 {
    public static void main(String[] args) throws Exception {
        InputStreamReader inputStreamReader = new InputStreamReader(System.in);
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
        String tests = bufferedReader.readLine();
        int t = Integer.parseInt(tests);
        while (t > 0) {
            --t;
            //Input function size
            String line1 = bufferedReader.readLine();
            String[] line1_temp = line1.split("\\s+");
            int n = Integer.parseInt(line1_temp[0]);

            //Max number of steps allowed
            int K = Integer.parseInt(line1_temp[1]);

//            long startTime = System.nanoTime();

            //Array to store input function
            double[] h = new double[n];

            //DP table for g_star
            double[][] g_star_prev = new double[n][n];
            double[][] g_star_curr = new double[n][n];

            //Get input function
            String input = bufferedReader.readLine();
            String[] input_vals = input.split("\\s+");
            for (int i = 0; i < n; ++i)
                h[i] = Integer.parseInt(input_vals[i]);

            //2D array to store means
            double[][] A = new double[n][n];

            //2D array to store sum of squares
            double[][] SS = new double[n][n];

            //2D array to store min SSE
            double[][] D = new double[n][n];

            //2D array to store loss
            double[][] loss = new double[K][n];

            //Mean for just one value
            for (int i = 0; i < n; ++i)
                A[i][i] = h[i];

            //Other means
            for (int r = 0; r < n; ++r) {
                for (int c = r + 1; c < n; ++c) {
                    double mean_so_far = A[r][c - 1];
                    double new_mean = ((mean_so_far * (c - r)) + A[c][c]) / ((c - r) + 1);
                    A[r][c] = new_mean;
                }
            }

            //Fill in sum of squares
            for (int r = 0; r < n; ++r) {
                for (int c = r; c < n; ++c) {
                    if (c == r)
                        SS[r][c] = Math.pow(h[c], 2);
                    else
                        SS[r][c] = SS[r][c - 1] + Math.pow(h[c], 2);
                }
            }

            //Computing Dij
            for (int r = 0; r < n; ++r) {
                for (int c = r; c < n; ++c) {
                    D[r][c] = SS[r][c] - ((c - r) + 1) * Math.pow(A[r][c], 2);
                }
            }

            //Working on DP table
            //First row - Base Case
            for (int j = 0; j < n; ++j) {
                for (int k = 0; k < n; ++k) {
                    g_star_prev[j][k] = A[0][j];
                    loss[0][j] = D[0][j];
                }
            }
            //Remainder of the table
            for (int i = 1; i < K; ++i) {
                for (int j = 0; j < n; ++j) {
                    int temp = t(i, j, D, loss);
                    for (int k = 0; k < n; ++k) {
                        if (k >= temp)
                            g_star_curr[j][k] = A[temp][j];
                        else {
                            g_star_curr[j][k] = g_star_prev[temp - 1][k];
                        }
                    }
                }
                for (int j = 0; j < n; ++j) {
                    arraycopy(g_star_curr[j], 0, g_star_prev[j], 0, n);
                }
            }

            //Calculate steps
            int cnt = 1;
            for (int k = 1; k < n; ++k)
                if (g_star_prev[n - 1][k] != g_star_prev[n - 1][k - 1])
                    cnt++;

            //Calculate error
            double error = 0;
            for (int i = 0; i < h.length; ++i) {
                error += Math.pow((h[i] - g_star_prev[n - 1][i]), 2);
            }

            //Print output
            System.out.println(cnt + " " + error);
            cnt = 1;
            System.out.println(cnt + " " + g_star_prev[n - 1][0]);
            for (int k = 1; k < n; ++k)
                if (g_star_prev[n - 1][k] != g_star_prev[n - 1][k - 1])
                    System.out.println((k + 1) + " " + g_star_prev[n - 1][k]);
//            long endTime = System.nanoTime();
//            long totalTime = endTime - startTime;
//            System.out.println(totalTime/1000000000.0);
        }
    }

    //Calculate optimal position for last step
    static int t(int i, int j, double[][] D, double[][] loss) {
        double min = Double.MAX_VALUE;
        int min_pos = 0;
        for (int s = 1; s <= j; ++s) {
            double sum = loss[i - 1][s - 1] + D[s][j];
            if (sum < min) {
                min = sum;
                min_pos = s;
            }
        }
        loss[i][j] = min;
        return min_pos;
    }
}
