window.addEventListener('DOMContentLoaded', async () => {
    window.clerk = Clerk.initialize({ frontendApi: "pk_test_Y29tcG9zZWQtc2F0eXItNDAuY2xlcmsuYWNjb3VudHMuZGV2JA"});
    
    clerk.mountSignIn('#sign-in-container', {
      afterSignInUrl: '/dashboard.html', 
      appearance: {
        variables: {
          colorPrimary: "#4F46E5", 
        },
      },
    });
  });