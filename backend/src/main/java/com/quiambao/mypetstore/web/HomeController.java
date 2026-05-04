package com.quiambao.mypetstore.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    private final String adminLoginUrl;

    public HomeController(@Value("${app.admin.login-url:http://localhost:5173/admin/login}") String adminLoginUrl) {
        this.adminLoginUrl = adminLoginUrl;
    }

    @GetMapping({"/", "/admin", "/admin/"})
    public String adminDashboard() {
        return "forward:/admin/index.html";
    }

    @GetMapping("/admin/logout")
    public String adminLogout() {
        return "redirect:" + adminLoginUrl + (adminLoginUrl.contains("?") ? "&" : "?") + "logout=1";
    }
}
