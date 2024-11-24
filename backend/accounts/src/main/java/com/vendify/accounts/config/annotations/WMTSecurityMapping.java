package com.vendify.accounts.config.annotations;

public @interface WMTSecurityMapping {
    String path() default "";
    boolean tokenEnabled() default true;
}
