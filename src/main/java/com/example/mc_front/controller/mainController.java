package com.example.mc_front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mainController {

    @GetMapping("/sign-up")
    public String signUp() {
        return "signup";
    }
}
