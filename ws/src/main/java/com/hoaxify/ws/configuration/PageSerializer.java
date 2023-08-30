package com.hoaxify.ws.configuration;

import java.io.IOException;

import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Page;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

@JsonComponent //spring initialize olurken bu class'ı görüp Jackson'a da bu class'ı kullanması için tanımlamış oluyor
public class PageSerializer extends JsonSerializer<Page<?>> {

	@Override
	public void serialize(Page<?> value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		gen.writeStartObject();
		gen.writeFieldName("content");
		serializers.defaultSerializeValue(value.getContent(), gen);
		gen.writeObjectField("pageable", value.getPageable());
		gen.writeBooleanField("last", value.isLast());
		gen.writeNumberField("totalPages", value.getTotalPages());
		gen.writeNumberField("totalElement", value.getTotalElements());
		gen.writeNumberField("size", value.getSize());
		gen.writeNumberField("number", value.getNumber());
		gen.writeObjectField("sort", value.getSort());
		gen.writeNumberField("numberOfElements", value.getNumberOfElements());
		gen.writeBooleanField("first", value.isFirst());
		gen.writeBooleanField("empty", value.isEmpty());
		gen.writeEndObject();
	}

}
