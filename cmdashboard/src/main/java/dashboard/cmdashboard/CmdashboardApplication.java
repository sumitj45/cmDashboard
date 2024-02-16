package dashboard.cmdashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class CmdashboardApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(CmdashboardApplication.class, args);
    }

    @Override
    protected final SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(CmdashboardApplication.class);
    }
}
