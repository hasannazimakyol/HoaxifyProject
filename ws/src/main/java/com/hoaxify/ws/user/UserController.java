package com.hoaxify.ws.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
=======
import org.springframework.security.access.prepost.PreAuthorize;
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
=======
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.error.ApiError;
<<<<<<< HEAD
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.shared.Views;
=======
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.vm.UserUpdateVM;
import com.hoaxify.ws.user.vm.UserVM;
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35

import jakarta.validation.Valid;

@RestController
<<<<<<< HEAD
=======
@RequestMapping("/api/1.0")
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
public class UserController {
	
//	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;

<<<<<<< HEAD
	@PostMapping("/api/1.0/users")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createUser(@Valid @RequestBody User user) {
//	public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
//		log.info(user.toString());

//		ApiError error = new ApiError(400, "Validation error", "api/1.0/users");
//		Map<String, String> validationErrors = new HashMap<>();
//		String username = user.getUsername();
//		String displayName = user.getDisplayName();
//		
//		if(username == null || username.isEmpty()) {
//			validationErrors.put("username", "Username cannot be null");
//		}
//		
//		if(username == null || username.isEmpty()) {
//			validationErrors.put("displayName", "Cannot be null");
//		}
//		
//		if(validationErrors.size() > 0) {
//			error.setValidationErrors(validationErrors);
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
//		}
//		userService.save(user);
//		return ResponseEntity.ok(new GenericResponse("User created."));
//		response.setMessage("User created.");
//		return response;
		
		userService.save(user);
		return new GenericResponse("User created.");
		
	}
	
	@GetMapping("/api/1.0/users")
	@JsonView(Views.Base.class)
	//Page<User> getUsers(@RequestParam int currentPage, @RequestParam(required = false, defaultValue = "5") int pageSize){
	Page<User> getUsers(Pageable page){
		return userService.getUsers(page);
	}
	
//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	public ApiError handleValidationException(MethodArgumentNotValidException exception) {
//		ApiError error = new ApiError(400, "Validation error", "api/1.0/users");
//		Map<String, String> validationErrors = new HashMap<>();
//		for(FieldError fieldError :exception.getBindingResult().getFieldErrors()) {
//			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
//		}
//		error.setValidationErrors(validationErrors);
//		return error;
//	}
=======
	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createUser(@Valid @RequestBody User user) {
		userService.save(user);
		return new GenericResponse("User created.");
	}
	
	@GetMapping("/users")
	//Page<User> getUsers(@RequestParam int currentPage, @RequestParam(required = false, defaultValue = "5") int pageSize){
	Page<UserVM> getUsers(Pageable page, @CurrentUser User user){
		//return userService.getUsers(page).map(user -> {
		//	return new UserVM(user);
		//});
		return userService.getUsers(page, user).map(UserVM::new); //yukarıdakiyle aynı işlem gerçekleşiyor method reference
	}
	
	@GetMapping("/users/{username}")
	UserVM getUser(@PathVariable String username){
		User user = userService.getByUsername(username);
		return new UserVM(user);
	}
	
	@PutMapping("/users/{username}")
	@PreAuthorize("#username == principal.username")
	ResponseEntity<?> updateUser(@Valid @RequestBody UserUpdateVM updatedUser, @PathVariable String username){
		//@CurrentUser User loggedInUser) {
		//if(!loggedInUser.getUsername().equals(username)) {
		//	ApiError error = new ApiError(403, "Cannot change another users data", "/api/1.0/users/" + username);
		//	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
		//}
		User user = userService.updateUser(username, updatedUser);
		return ResponseEntity.ok(new UserVM(user));
	}
	
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
	
}
 