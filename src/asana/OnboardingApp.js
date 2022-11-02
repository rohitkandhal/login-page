/**
 * Approach
 * 0. Store data collected in all 4 screens so that create team button has info about that
 * 1. Build third screen
 *    - Layout
 *    - add team name parser (Done)
 *    - show error results (Done)
 *    - green check mark in form input
 *    - error styles
 * 2. Hook Back and Continue buttons
 *    - Update them to input controls. No div as buttons 
 * 3. Fix Layout for all three screens
 *    - Alignment of back and continue buttons
 *    - Style of textbox 
 *    - Fix Tab and focus
 *    - Aria label
 */

import { useState, useCallback } from 'react'

/**
 * Simulates making a call to the Asana API to determine whether
 * a team domain name is already in use.
 *
 * Returns a Promise that will resolve with an object with two fields:
 *  - isInUse: true if the team domain name is in use, false otherwise
 *  - suggestions: if the team domain name is in use, suggested alternatives
 *
 * Note that this endpoint does not perform any other validation.
 *
 * **Do not alter this function as part of your solution**
 */
function isTeamDomainNameInUse(name) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      var existingTeams = ["asana", "luna", "sashimi"];
      if (name) {
        var normalizedName = name.trim().toLowerCase();
        if (existingTeams.indexOf(normalizedName) >= 0) {
          var suggestions = ["team", "-team", "group", "-group"].map(suffix => {
            return normalizedName + suffix;
          });

          resolve({ isInUse: true, suggestions: suggestions });
          return;
        }
      }

      resolve({ isInUse: false, suggestions: [] });
    }, 500);
  });
};

function CheckIcon() {
  return <svg className="checkIcon" viewBox="0 0 32 32">
    <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 " />
  </svg>;
}

function FormInput({ placeholder, children, value, onChange, name }) {
  return <input className="formInput"
    placeholder={placeholder}
    value={value}
    onChange={(e) => {
      console.log(e.target.value)
      onChange(e.target.value)
    }}
    name={name}
    required />;
}

function BackButton({ value, onClick, disabled }) {
  return <input type="button" className="backButton" value={value || "Back"} onClick={onClick} disabled={disabled}></input>;
}

function ContinueButton({ value, onClick }) {
  return <input type="button" className="continueButton" value={value || "Continue"} onClick={onClick}></input>;
}

function StepOne({ firstName, setFirstName, lastName, setLastName, username, setUsername }) {
  return (
    <>
      <div className="step">
        <div className="stepCount">Step 1 of 2</div>
        <div className="stepTitle">Does this look right?</div>
        <div className="stepPrimaryInstructions">We've used your Google sign in name and email to set up your Asana profile.</div>
        <div className="formTitle">Your name</div>
        <FormInput placeholder="Matt" value={firstName} name="firstName" onChange={setFirstName}></FormInput>
        <FormInput placeholder="Bond" value={lastName} name="lastName" onChange={setLastName}></FormInput>
        <div className="formTitle">Username</div>
        <FormInput placeholder="mattbond" value={username} onChange={setUsername}></FormInput>
        <div className="smallGrayInstructions">
          Usernames must be all lowercase, with no spaces.
          They can only contain letters, numbers, hyphens, and underscores.
        </div>
      </div>
    </>
  )

}

function StepTwo() {
  return (
    <>
      <div className="stepTitle">What's the name of your company?</div>
      <div className="stepPrimaryInstructions"></div>
      <div className="formTitle">Company name</div>
      {/* TODO: Make this full width */}
      <FormInput placeholder="Ex. Acme Industries"></FormInput>
      <div className="smallGrayInstructions">
        We'll use this to name your Asana team, which you can always change later.
      </div>
    </>
  );
}

function StepThree() {
  return (
    <>
      <div className="stepTitle">What address do you want for your Asana team?</div>
      <div className="stepPrimaryInstructions">Choose the address you'll use to sign in to Asana.</div>
      <div className="formTitle">Your team domain</div>
      {/* TODO: Make this full width */}
      <TeamDomainNameComponent />
    </>
  )
}

function TeamDomainNameComponent() {
  const [teamName, setTeamName] = useState("");
  const [teamNameEdited, setteamNameEdited] = useState("");
  const [teamNameSuggestions, setTeamNameSuggestions] = useState([]);

  function onTeamNameChangeHandler(event) {
    const newTeamName = event.target.value;
    // clear out existing states before making new call
    setTeamNameSuggestions([]);
    setteamNameEdited('');

    // ideally use throttled version of isTeamDomainNameInUse
    isTeamDomainNameInUse(newTeamName).then(response => {
      if (response && response.isInUse) {
        // parse suggestions
        setTeamNameSuggestions(response.suggestions);
        setteamNameEdited(newTeamName);
      } else if (response && !response.isInUse) {
        // update team name
        setTeamName(newTeamName);
      }

    });
    console.log(event.target.value)
  }

  return (
    <>
      <FormInput placeholder="big-nerds" onChange={onTeamNameChangeHandler} ></FormInput>.asana.com

      {teamNameSuggestions.length === 0 && teamName.length > 0 && <CheckIcon className="validTeamNameCheckIcon" />}

      {teamNameSuggestions.length > 0 &&
        <>
          <div className="suggestionTitle">
            {teamNameEdited} is already taken, how about...
          </div>

          {teamNameSuggestions.map((suggestion, index) =>
            <div className="suggestionRow" key={"suggestionRow-" + index}>
              <span className="suggestedTeamName" >{suggestion}</span>.asana.com
            </div>
          )
          }
        </>
      }
    </>
  );
}

function wrapperHigherOrderFunction(InnerComponent, currStepNum, totalSteps, onBackClick, onContinueClick) {
  const isLastStep = Number(currStepNum) === Number(totalSteps);

  return function OuterComponent(propsToInnerComponent) {
    return (
      <>
        <div className="step">
          <div className="stepCount">Step {currStepNum} of {totalSteps} </div>

          <InnerComponent {...propsToInnerComponent}></InnerComponent>

          <BackButton onClick={() => {
            propsToInnerComponent.validate ? propsToInnerComponent.validate() && onBackClick() : onBackClick();

          }} disabled={Number(currStepNum) === 1}></BackButton>
          <ContinueButton onClick={onContinueClick} value={isLastStep ? "Create Team" : "Continue"}></ContinueButton>

          {isLastStep && <div className="smallGrayInstructions">
            By creating a team, you're agreeing to our terms and conditions
          </div>
          }
        </div>
      </>
    )
  }
}

const totalStepCount = 3;


export default function OnboardingApp() {
  const [totalStepCount, setTotalStepCount] = useState("3");
  const [currStepNum, setCurrStepNum] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");


  const StepOneComponent = wrapperHigherOrderFunction(StepOne, 1, totalStepCount, onBackButtonClick, onContinueButtonClick);
  const StepTwoComponent = wrapperHigherOrderFunction(StepTwo, 2, totalStepCount, onBackButtonClick, onContinueButtonClick);
  const StepThreeComponent = wrapperHigherOrderFunction(StepThree, 3, totalStepCount, onBackButtonClick, onContinueButtonClick);

  function onContinueButtonClick() {
    console.log('onContinueButtonClick')
    if (currStepNum <= totalStepCount) {
      setCurrStepNum(prev => prev + 1)
    }
  }

  function onBackButtonClick() {
    console.log('onBackButtonClick')
    if (currStepNum > 1) {
      setCurrStepNum(prev => prev - 1)
    }
  }

  const renderOnBoardingStepsContent = useCallback(() => {

    switch (currStepNum.toString()) {
      case "1":
        return <StepOneComponent firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          username={username}
          setUsername={setUsername}
        ></StepOneComponent>;

      case "2":
        // { firstName, lastName, username }
        return <StepTwoComponent>Hi</StepTwoComponent>;

      case "3":
        return <StepThreeComponent />;

      default:
        return null;
    }
  }, [currStepNum]);

  return (
    <>
      {renderOnBoardingStepsContent()}
    </>
  )
}


// ****** DEAD CODE ******

// ReactDOM.render(
//   <StepOne name="Matt Bond" username="mattbond">Hi</StepOne>,
//   document.getElementById('step1')
// );

// ReactDOM.render(
//   <StepTwo>Hi</StepTwo>,
//   document.getElementById('step2')
// );
