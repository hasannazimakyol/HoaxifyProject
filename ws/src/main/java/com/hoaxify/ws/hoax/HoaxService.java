package com.hoaxify.ws.hoax;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.file.FileAttachment;
import com.hoaxify.ws.file.FileAttachmentRepository;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.hoax.vm.HoaxSubmitVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@Service
public class HoaxService {

	HoaxRepository hoaxRepository;

	UserService userService;
	
	FileAttachmentRepository fileAttachmentRepository;
	
	FileService fileService;

	public HoaxService(HoaxRepository hoaxRepository, FileAttachmentRepository fileAttachmentRepository, FileService fileService, UserService userService) {
		super();
		this.hoaxRepository = hoaxRepository;
		this.fileAttachmentRepository = fileAttachmentRepository;
		this.fileService = fileService;
		this.userService = userService;
	}

	public void save(HoaxSubmitVM hoaxSubmitVM, User user) {
		Hoax hoax = new Hoax();
		hoax.setContent(hoaxSubmitVM.getContent());
		hoax.setTimestamp(new Date());
		hoax.setUser(user);
		hoaxRepository.save(hoax);
		Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(hoaxSubmitVM.getAttachmentId());
		if(optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setHoax(hoax);
			fileAttachmentRepository.save(fileAttachment);
		}
	}

	public Page<Hoax> getHoaxes(Pageable page) {
		return hoaxRepository.findAll(page);
	}

	public Page<Hoax> getUserHoaxes(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return hoaxRepository.findByUser(inDB, page);
	}

	public Page<Hoax> getOldHoaxes(long id, String username, Pageable page) {
		Specification<Hoax> specIdLessThan = idLessThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			Specification<Hoax> specUserIs = userIs(inDB);
			Specification<Hoax> spec = specIdLessThan.and(specUserIs);
			return hoaxRepository.findAll(spec, page);
		}
		return hoaxRepository.findAll(specIdLessThan, page);
	}

	public long getNewHoaxesCount(long id, String username) {
		Specification<Hoax> specification = idGreaterThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.count(specification);
	}

	public List<Hoax> getNewHoaxes(long id, String username, Sort sort) {
		Specification<Hoax> specification = idGreaterThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.findAll(specification, sort);
	}

	Specification<Hoax> idLessThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.lessThan(root.get("id"), id);
		};
//		return new Specification<Hoax>() {
//		@Override
//		public Predicate toPredicate(Root<Hoax> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
//			return criteriaBuilder.lessThan(root.get("id"), id);
//		}
	};
	
	Specification<Hoax> idGreaterThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.greaterThan(root.get("id"), id);
		};
	};
	
	Specification<Hoax> userIs(User user) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};
	}

	public void delete(long id) {
		Hoax inDB = hoaxRepository.getReferenceById(id);
		if(inDB.getFileAttachment() != null) {
			String fileName = inDB.getFileAttachment().getName();
			fileService.deleteAttachmentFile(fileName);
		}
		hoaxRepository.deleteById(id);
	};
}
