package com.hoaxify.ws.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonView;
<<<<<<< HEAD
import com.hoaxify.ws.shared.Views;
=======
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35

import lombok.Data;

@Data
public class ApiError {
	
<<<<<<< HEAD
	@JsonView(Views.Base.class)
	private int status;
	
	@JsonView(Views.Base.class)
	private String message;
	
	@JsonView(Views.Base.class)
	private String path;
	
	@JsonView(Views.Base.class)
=======
	private int status;
	
	private String message;
	
	private String path;
	
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
	private long timestamp = new Date().getTime();
	
	private Map<String, String> validationErrors;
	
	public ApiError(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}
	
}
