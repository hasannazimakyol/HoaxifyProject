package com.hoaxify.ws.user;

<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByUsername(String username);
=======
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByUsername(String username);
	
	Page<User> findByUsernameNot(String username, Pageable page);
	
	// spring data kendisi bu yarattığımız fonksiyon için query üretemiyor o yüzden bu annotation'ı kullanıyoruz 
	// jpql kullanıldı ancak sql de kullanılabilir
	//@Query(value="Select u from User u")  
	//Page<UserProjection> getAllUsersProjection(Pageable page);
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
}
