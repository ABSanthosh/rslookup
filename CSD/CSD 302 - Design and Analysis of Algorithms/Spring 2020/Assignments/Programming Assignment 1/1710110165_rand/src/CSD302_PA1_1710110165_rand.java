import java.util.ArrayList;
import java.util.Scanner;

/**
 * CSD302 - Programming Assignment #1
 * @author Kabir Kanha Arora
 */
public class CSD302_PA1_1710110165_rand {
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
        int pivot = (int) (Math.random()*(arr.size()));
        int pivot_element = arr.get(pivot);
        ArrayList<Integer> left_arr = new ArrayList<>();
        ArrayList<Integer> right_arr = new ArrayList<>();
        for (Integer integer : arr) {
            if (integer <= pivot_element)
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
}
