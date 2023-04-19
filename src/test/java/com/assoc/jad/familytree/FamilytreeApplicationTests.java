package com.assoc.jad.familytree;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

@SpringBootTest
class FamilytreeApplicationTests extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Test
	void contextLoads() {
	}
	@Test
	void givenHttpServletRequest_whenUsingMockHttpServletRequest_thenReturnsParameterValues() throws IOException, ServletException {
	    MockHttpServletRequest request = new MockHttpServletRequest();
	    request.setParameter("firstName", "Spring");
	    request.setParameter("lastName", "Test");
	    MockHttpServletResponse response = new MockHttpServletResponse();

	    FamilytreeApplicationTests servlet = new FamilytreeApplicationTests();
	    servlet.doGet(request, response);

	    assertThat(response.getContentAsString()).isEqualTo("Full Name: Spring Test");
	}
}
