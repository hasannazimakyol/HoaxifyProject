package com.hoaxify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.hoaxify.ws.hoax.HoaxService;
import com.hoaxify.ws.hoax.vm.HoaxSubmitVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
//		ApplicationContext applicationContext = SpringApplication.run(WsApplication.class, args);
//		String[] allBeanNames = applicationContext.getBeanDefinitionNames();
//		for(String beanName : allBeanNames) {
//			System.out.println(beanName);
//		}
	}

	@Bean // @Bean annotation'ı spring çalıştığında bu objeyi yaratması için
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService, HoaxService hoaxService) { // initialize
		return (args) -> {
			for (int i = 1; i <= 25; i++) {
				User user = new User();
				user.setUsername("user" + i);
				user.setDisplayName("display" + i);
				user.setPassword("P4ssword");
				userService.save(user);
				for (int j = 1; j <= 20; j++) {
					HoaxSubmitVM hoax = new HoaxSubmitVM();
					hoax.setContent("haox - (" + j + ") from user " + i);
					hoaxService.save(hoax, user);
				}
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
