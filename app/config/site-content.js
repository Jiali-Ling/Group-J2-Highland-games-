export const siteContent = {
  siteName: "Paisley Highland Games",
  
  teams: {
    pageTitle: "Teams",
    pageDescription: "Create or join teams to compete together in Highland Games events",
    createTeamButton: "Create Team",
    joinTeamButton: "Join Team",
    cancelButton: "Cancel",
    
    createForm: {
      title: "Create New Team",
      nameLabel: "Team Name *",
      descriptionLabel: "Description",
      submitButton: "Create Team",
      submittingButton: "Creating..."
    },
    
    joinForm: {
      title: "Join Team",
      codeLabel: "Team Invite Code *",
      codePlaceholder: "Enter 8-character code",
      submitButton: "Join Team",
      submittingButton: "Joining..."
    },
    
    successMessage: {
      title: "✓ Team Created Successfully!",
      teamNameLabel: "Team Name:",
      inviteCodeLabel: "Invite Code:",
      shareMessage: "Share this code with teammates to invite them!"
    },
    
    yourTeams: {
      title: "Your Teams",
      emptyMessage: "You haven't joined any teams yet.",
      ownerLabel: "Owner:",
      membersLabel: "Members:",
      inviteCodeLabel: "Invite Code:",
      leaveButton: "Leave Team"
    },
    
    ownedTeams: {
      title: "Teams You Own",
      emptyMessage: "You haven't created any teams yet.",
      inviteCodeLabel: "Invite Code:",
      membersTitle: "Members"
    }
  },
  
  profile: {
    pageTitle: "Your Profile",
    pageDescription: "Manage your personal information and preferences",
    
    accountInfo: {
      title: "Account Information",
      description: "Your email address is used for login and notifications",
      emailLabel: "Email:",
      statusLabel: "Status:",
      verifiedStatus: "✓ Verified",
      notVerifiedStatus: "⚠️ Not verified"
    },
    
    personalInfo: {
      title: "Personal Information",
      fullNameLabel: "Full Name *",
      dateOfBirthLabel: "Date of Birth",
      phoneLabel: "Phone Number",
      addressLabel: "Address",
      emergencyContactLabel: "Emergency Contact",
      emergencyContactPlaceholder: "Name and phone number",
      medicalInfoLabel: "Medical Information",
      medicalInfoPlaceholder: "Allergies, medical conditions, medications, etc.",
      medicalInfoNote: "This information is kept confidential and only used for safety purposes",
      submitButton: "Save Profile",
      submittingButton: "Saving..."
    },
    
    footer: {
      privacyLink: "Privacy & Data Rights",
      signOutLink: "Sign Out"
    }
  },
  
  auth: {
    login: {
      title: "Sign In",
      description: "Welcome back to Highland Games",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Your password",
      submitButton: "Sign In",
      submittingButton: "Signing in...",
      switchText: "Don't have an account?",
      switchLink: "Sign up"
    },
    
    register: {
      title: "Create Account",
      description: "Join Highland Games today",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Choose a password",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Repeat password",
      submitButton: "Create Account",
      submittingButton: "Creating account...",
      switchText: "Already have an account?",
      switchLink: "Sign in"
    }
  },
  
  events: {
    pageTitle: "Highland Games Events",
    pageDescription: "Discover and register for upcoming Highland Games competitions",
    emptyMessage: "No events scheduled yet.",
    registerButton: "Register Now",
    viewDetailsButton: "View Details",
    dateLabel: "Date:",
    locationLabel: "Location:",
    categoriesLabel: "Categories:",
    registrationsLabel: "Registrations:"
  },
  
  admin: {
    pageTitle: "Admin Dashboard",
    pageDescription: "Manage event registrations and approvals",
    
    pendingSection: {
      title: "Pending Registrations",
      emptyMessage: "No pending registrations.",
      eventLabel: "Event:",
      categoryLabel: "Category:",
      typeLabel: "Type:",
      userLabel: "User:",
      teamLabel: "Team:",
      approveButton: "Approve",
      rejectButton: "Reject"
    },
    
    approvedSection: {
      title: "Approved Registrations",
      emptyMessage: "No approved registrations yet."
    },
    
    rejectedSection: {
      title: "Rejected Registrations",
      emptyMessage: "No rejected registrations."
    }
  },
  
  winners: {
    pageTitle: "Hall of Champions",
    pageDescription: "Celebrating the best Highland Games athletes",
    emptyMessage: "No winners recorded yet.",
    eventLabel: "Event:",
    categoryLabel: "Category:",
    athleteLabel: "Athlete:",
    teamLabel: "Team:",
    timeLabel: "Time:",
    notesLabel: "Notes:"
  },
  
  privacy: {
    pageTitle: "Privacy & Data Rights",
    pageDescription: "Manage your personal data and privacy settings",
    
    exportSection: {
      title: "Export Your Data",
      description: "Download all your personal data in JSON format.",
      button: "Export My Data"
    },
    
    correctSection: {
      title: "Correct Your Data",
      description: "Request corrections to your personal information.",
      button: "Request Data Correction"
    },
    
    deleteSection: {
      title: "Delete Your Account",
      description: "Permanently delete your account and all associated data. This action cannot be undone.",
      warning: "⚠️ This will permanently delete all your data including profile, team memberships, and event registrations.",
      confirmLabel: "Type DELETE to confirm:",
      confirmPlaceholder: "Type DELETE",
      button: "Delete My Account"
    }
  },
  
  home: {
    heroTitle: "Paisley Highland Games",
    heroSubtitle: "Experience the power and tradition of Scottish athletics",
    heroButton: "Explore Events",
    
    featuresTitle: "What We Offer",
    features: [
      {
        icon: "🏆",
        title: "Competitive Events",
        description: "Traditional Highland Games competitions"
      },
      {
        icon: "👥",
        title: "Team Spirit",
        description: "Form teams and compete together"
      },
      {
        icon: "📊",
        title: "Track Progress",
        description: "Monitor your performance and achievements"
      },
      {
        icon: "🔒",
        title: "Privacy First",
        description: "Full GDPR compliance and data control"
      }
    ]
  },
  
  messages: {
    success: {
      profileUpdated: "Profile updated successfully",
      teamCreated: "Team created successfully",
      teamJoined: "Successfully joined team!",
      teamLeft: "Left team successfully",
      registrationSubmitted: "Registration submitted successfully",
      dataExported: "Data exported successfully",
      correctionRequested: "Correction request submitted",
      accountDeleted: "Account deleted successfully"
    },
    
    errors: {
      invalidEmail: "Please enter a valid email address",
      passwordTooShort: "Password must be at least 8 characters",
      passwordMismatch: "Passwords do not match",
      emailInUse: "Email already in use",
      invalidCredentials: "Invalid email or password",
      teamNameTooShort: "Team name must be at least 2 characters",
      invalidInviteCode: "Invalid invite code",
      alreadyMember: "You are already a member of this team",
      fullNameTooShort: "Full name must be at least 2 characters",
      confirmDelete: "Please type DELETE to confirm",
      genericError: "An error occurred. Please try again."
    }
  }
};
