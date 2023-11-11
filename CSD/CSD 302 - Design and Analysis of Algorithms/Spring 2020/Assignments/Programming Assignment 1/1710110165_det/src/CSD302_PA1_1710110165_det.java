import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

/**
 * CSD302 - Programming Assignment #1
 * @author Kabir Kanha Arora
 */
public class CSD302_PA1_1710110165_det {
    static int counter=0;
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int T = scanner.nextInt();
        while (T > 0) {
            T--;

            //Getting Input
            int n = scanner.nextInt();
            int k = scanner.nextInt();
            int[] main_arr = new int[n];
            ArrayList<Integer> arr = new ArrayList<>(n);
            for (int i = 0; i < n; ++i) {
                main_arr[i] = scanner.nextInt();
                arr.add(i, main_arr[i]);
            }
            getRank(arr, k);
        }
        System.out.println("\n********************");
        System.out.println("Total number of Comparisons = "+counter);
    }

    static void getRank(ArrayList<Integer> arr, int k) {
        int median = findMedian(arr);
        int pivot = 0;
        for (int i = 0; i < arr.size(); ++i) {
            if (arr.get(i) == median) {
                pivot = i;
                break;
            }
        }
        ArrayList<Integer> left_arr = new ArrayList<>();
        ArrayList<Integer> right_arr = new ArrayList<>();
        for (Integer integer : arr) {
            if (integer <= median)
                left_arr.add(integer);
            else
                right_arr.add(integer);
            counter++;
        }
        if (left_arr.size() == k)
            System.out.println(arr.get(pivot));
        else {
            if (left_arr.size() < k)
                getRank(right_arr, k - left_arr.size());
            else
                getRank(left_arr, k);
        }
    }

    static int findMedian(ArrayList<Integer> arr) {
        //Finding Median
        int size = arr.size();
        int chunks;
        while (size > 1) {
            chunks = (size % 5 == 0) ? size / 5 : size / 5 + 1;
            ArrayList<Integer> newMedians = new ArrayList<>(chunks);
            for (int i = 0; i < chunks; ++i) {
                int start = 5 * i;
                int end;
                if (start + 4 >= size)
                    end = size - 1;
                else
                    end = start + 4;
                int newEntry = findMedianOf5(arr, start, end);
                newMedians.add(newEntry);
            }
            arr = newMedians;
            size = arr.size();
        }
        return arr.get(0);
    }

    static int findMedianOf5(ArrayList<Integer> arr, int start, int end) {
        int size = end - start + 1;
        int[] temp = new int[size];
        for (int i = start, j = 0; i <= end; ++i, ++j) {
            temp[j] = arr.get(i);
        }
        Arrays.sort(temp);
        return temp[((temp.length - 1)) / 2];
    }
}
