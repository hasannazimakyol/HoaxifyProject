package com.hoaxify.ws.auth;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.CurrentUser;
<<<<<<< HEAD
import com.hoaxify.ws.shared.Views;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;
=======
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;
import com.hoaxify.ws.user.vm.UserVM;
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35

@RestController
public class AuthController {
	
//	private static final Logger log = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired
	UserRepository userRepository;
	
<<<<<<< HEAD
	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@PostMapping("api/1.0/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(@CurrentUser User user){
//	ResponseEntity<?> handleAuthentication(Authentication authentication){
//	ResponseEntity<?> handleAuthentication(@RequestHeader(name="Authorization", required = false) String authorization){
//		log.info(authorization);
//		if(authorization == null) {
//			ApiError error = new ApiError(401, "Unauthorized request", "/api/1.0/auth");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
//		}
//		String base64encoded = authorization.split("Basic ")[1]; // MzQyOjNFOEY2ZnJ3bUFGakdzbQ==
//		String decoded = new String(Base64.getDecoder().decode(base64encoded)); // user1:P4ssword
//		String[] parts = decoded.split(":");
//		String username = parts[0];
//		String password = parts[1];
//		User inDB = userRepository.findByUsername(username);
//		if(inDB == null) {
//			ApiError error = new ApiError(401, "Unauthorized request", "/api/1.0/auth");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
//		}
//		String hashedPassword = inDB.getPassword();
//		if(!passwordEncoder.matches(password, hashedPassword)) {
//			ApiError error = new ApiError(401, "Unauthorized request", "/api/1.0/auth");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
//		}
		
		// username, displayName, image
//		Map<String, String> responseBody = new HashMap<>();
//		responseBody.put("username", inDB.getUsername());
//		responseBody.put("displayName", inDB.getDisplayName());
//		responseBody.put("image", inDB.getImage());
//		return ResponseEntity.ok(responseBody);
		
//		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//		User user = (User) authentication.getPrincipal();
//		String username = user.getUsername();
//		User inDB = userRepository.findByUsername(username);
		
		return ResponseEntity.ok(user);
	}
	
//	@ExceptionHandler(BadCredentialsException.class)
//	@ResponseStatus(HttpStatus.UNAUTHORIZED)
//	ApiError handleBadCredentialsException() {
//		ApiError error = new ApiError(401, "Unauthorized request", "api/1.0/auth");
//		return error;
//	}

=======
	@PostMapping("api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user){
		return new UserVM(user);
	}
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
}
