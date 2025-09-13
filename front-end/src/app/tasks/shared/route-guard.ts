import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";


export const routeGuard : CanActivateFn = (route, state) => {
    const router = inject(Router)

    if (localStorage.getItem("account")) {
        return true;
    }

    router.navigate(["login"])
    return true;
}

export const loggedInGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    if (localStorage.getItem("account")) {
        router.navigate(["tasks"])
        return true;
    }

    return true;

    
}