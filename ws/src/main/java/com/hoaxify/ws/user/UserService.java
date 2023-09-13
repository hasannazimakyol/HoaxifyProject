package com.hoaxify.ws.user;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.hoax.HoaxService;
import com.hoaxify.ws.user.vm.UserUpdateVM;

@Service
public class UserService {
	
	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder;
	
	FileService fileService;
	
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.fileService = fileService;
	}
	
	public void save(User user) {
		String encryptedPassword = this.passwordEncoder.encode(user.getPassword());
		user.setPassword(encryptedPassword);
		userRepository.save(user);
	}

	//public Page<User> getUsers(int currentPage, int pageSize) {
	public Page<User> getUsers(Pageable page, User user) {
		//Pageable page = PageRequest.of(currentPage, pageSize);
		if(user != null) {
			return userRepository.findByUsernameNot(user.getUsername(), page);
		}
		return userRepository.findAll(page);
	}

	public User getByUsername(String username) {
		User inDB = userRepository.findByUsername(username);
		if(inDB == null) {
			throw new NotFoundException();
		}
		return inDB;
	}

	public User updateUser(String username, UserUpdateVM updatedUser) {
		User inDB = getByUsername(username);
		inDB.setDisplayName(updatedUser.getDisplayName());
		if(updatedUser.getImage() != null) {
			//inDB.setImage(updatedUser.getImage());
			String oldImageName = inDB.getImage();
			try {
				String storedFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
				inDB.setImage(storedFileName);
			} catch (IOException e) {
				e.printStackTrace();
			}
			fileService.deleteProfileImage(oldImageName);
		}
		return userRepository.save(inDB); //Spring data arka planda da hybernite database'ten gelen user'ı primary key'lerle birlikte tekrar göndererek güncelliyor
	}

	public void deleteUser(String username) {
		User inDB = userRepository.findByUsername(username);
		fileService.deleteAllStoredFilesForUser(inDB);
		userRepository.delete(inDB);
	}

}
