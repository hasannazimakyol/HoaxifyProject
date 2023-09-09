package com.hoaxify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
<<<<<<< HEAD
=======
import org.springframework.context.annotation.Profile;
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}
	
<<<<<<< HEAD
	@Bean // @Bean annotation'ı spring çalıştığında bu objeyi yaratması için 
=======
	@Bean // @Bean annotation'ı spring çalıştığında bu objeyi yaratması için
	@Profile("dev")
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
	CommandLineRunner createInitialUsers(UserService userService) { //initialize
		return (args) -> {
			for(int i = 1; i <= 25; i++) {
				User user = new User();
				user.setUsername("user" + i);
				user.setDisplayName("display" + i);
				user.setPassword("P4ssword");
				userService.save(user);
			}
		};
//		return new CommandLineRunner() {
//			
//			@Override
//			public void run(String... args) throws Exception {
//				User user = new User();
//				user.setUsername("user1");
//				user.setDisplayName("display1");
//				user.setPassword("P4ssword");
//				userService.save(user);
//			}
//		};
	}	

}
