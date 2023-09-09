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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.vm.UserUpdateVM;
import com.hoaxify.ws.user.vm.UserVM;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class UserController {
	
//	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;

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
	
	
}
 