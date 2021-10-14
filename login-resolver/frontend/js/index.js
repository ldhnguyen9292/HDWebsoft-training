document
  .getElementById("login_form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const token = await axios({
        method: "post",
        url: "http://localhost:8888/graphql",
        headers: { "Content-Type": "application/json" },
        data: {
          query: `query{
                  login(username:"${username}",password:"${password}"){
                    token
                  }
                }`,
          variables: {},
        },
      });
      localStorage.setItem(
        "token",
        JSON.stringify(token.data.data.login.token)
      );
      window.location.href = "./userProfile.html";
    } catch (error) {
      alert(error.response.data.errors[0].message);
    }
  });
