import java.sql.*;
import java.util.Scanner;

public class Practice1 {
	public static void main(String args[]) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost/jdbcdb","root","");
			System.out.println("Enter 1 to insert into table");
			System.out.println("Enter 2 to update table");
			System.out.println("Enter 3 to delete from table");
			System.out.println("Enter 4 to view table");
			Scanner sc = new Scanner(System.in);
			int ch=sc.nextInt();
			if(ch==4) {
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM emp");
				while(rs.next()) {
					System.out.println(rs.getInt(1)+" "+rs.getString(2)+" "+rs.getString(3)+" "+rs.getString(4));
				}
			}
			if(ch==3) {
				System.out.println("Enter employee id whose data is to be deleted:");
				int id=sc.nextInt();
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM emp WHERE emp_id="+id);
				if(rs.next()) {
					int i = stmt.executeUpdate("DELETE FROM emp WHERE emp_id="+id);
					System.out.println(i+" record deleted successfully");
				}
				else {
					System.out.println("Records with the specified id not available.");
				}
			}
			if(ch==1) {
				PreparedStatement stmt = con.prepareStatement("INSERT INTO emp (first_name,last_name,dept) VALUES (?,?,?)");
				System.out.println("Enter employee first name:");
				String fn=sc.next();
				System.out.println("Enter employee last name:");
				String ln=sc.next();
				System.out.println("Enter employee department:");
				String dpt=sc.next();
				stmt.setString(1, fn);
				stmt.setString(2, ln);
				stmt.setString(3, dpt);
				int i = stmt.executeUpdate();
				System.out.println(i+" records inserted");			
				}
			if(ch==2) {
				System.out.println("Enter employee id whose data is to be updated:");
				int id=sc.nextInt();
				Statement stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery("SELECT * FROM emp WHERE emp_id="+id);
				if(rs.next()) {
					PreparedStatement pstmt = con.prepareStatement("UPDATE emp SET first_name=?, last_name=?, dept=? WHERE emp_id=?");
					System.out.println("Enter employee first name:");
					String fn=sc.next();
					System.out.println("Enter employee last name:");
					String ln=sc.next();
					sc.nextLine();
					System.out.println("Enter employee department:");
					String dpt=sc.nextLine();
					pstmt.setString(1, fn);
					pstmt.setString(2, ln);
					pstmt.setString(3, dpt);
					pstmt.setInt(4, id);
					int i = pstmt.executeUpdate();
					System.out.println("record updated successfully");
				}
				else {
					System.out.println("Records with the specified id not available.");
				}
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e);
		}
	}
}
