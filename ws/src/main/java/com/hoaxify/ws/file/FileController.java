package com.hoaxify.ws.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {
	
	@Autowired
	FileService fileService;
	
	@PostMapping("/api/1.0/hoax-attachments")
//	Map<String, String> SaveHoaxAttachment(@RequestParam("file") MultipartFile multipartFile) {
	FileAttachment SaveHoaxAttachment(MultipartFile file) {
		return fileService.saveHoaxAttachment(file);
	}

}
