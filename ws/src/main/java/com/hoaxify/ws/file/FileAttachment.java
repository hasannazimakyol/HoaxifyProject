package com.hoaxify.ws.file;

import java.util.Date;

import com.hoaxify.ws.hoax.Hoax;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
public class FileAttachment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	
	@OneToOne
	private Hoax hoax;
	
}
