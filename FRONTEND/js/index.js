//ye jo next line code hai iska matlab jb tk sara html code ek baar execute nahi hoga ye wala html code run nahi hoga 
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            //prevent default event se page reload nahi hoga kyunki by default page reload ho jata hai on submit
            const fullname = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!fullname || !email || !username || !password) {
                alert("All fields are required");
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/api/v1/users/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, fullname, email, password }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Sign-up successful!");
                    window.location.href = "login.html";
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                alert("Failed to sign up");
                console.error("Error:", error);
            }
        });
    }

    const loginForm = document.getElementById("login-form")
    if(loginForm){
        loginForm.addEventListener("submit" , async(event)=>{
        event.preventDefault();
        const username = document.getElementById("username").value.trim()
        const password = document.getElementById("password").value.trim()

        if(!username || !password)
            {
                alert("please enter all fields")
                return
            }
        try {
            const response = await fetch("http://localhost:8000/api/v1/users/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({username, password})
            }
            )

            const result = await response.json()
            console.log("Response status:", response.status);
            console.log("Response message:", result.message);
            if(response.ok){
                alert("login successful")
                window.location.href = "task.html"
            }
            else{
                alert(`Error: ${result.message}`)
            }
        } catch (error) {
            alert("Failed to sign up")
            console.log("Error " ,error)
        }
        })
        
    }

        const logout = document.getElementById("logout")
        if(logout){
            logout.addEventListener("click" ,async(event)=>{
                event.preventDefault()
                try {
                    const response = await fetch("http://localhost:8000/api/v1/users/logout",{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        
                    })
                    const result = await response.json()
                    console.log("Response status:", response.status);
                    console.log("Response message:", result.message);
                    if(response.ok){
                        alert("logout successful")
                        window.location.href = "login.html"
                    }
                    else{
                        alert(`Error: ${result.message}`)
                    }

                } catch (error) {
                    alert("Failed to logout")
                    console.log("Error " ,error)
                }
            })
        }
    // Add similar event listeners and handlers for login, task creation, updating, deleting, etc.
});
