import React, {Component} from 'react';
import Drawing from "./components/drawing";
import Input from "./components/input";
import ZipCode from "./components/zip";
import UsersCount from "./components/usersCount";
//CONSTANTS
let unseen_label = 'Import Unseen network data';
let pseudopolis_label = 'Import Pseudopolis network data';
let mended_drum_label = 'Import Mended Drum network data';

/* Those names are used in array mails and state to see if file is imported*/
let Unseen_Emails = "unseenEmails";
let Pseudopolis_Emails = "pseudopolisEmails";
let Mended_Drum_Emails = "mendedDrumEmails";

let mails = {unseenEmails: [], pseudopolisEmails: [], mendedDrumEmails: []};

let zipCodes = [];

function parseUser(jsonObj)
{
  let user = {};
  user.email = jsonObj.email;

  if (jsonObj.id)
    user.id = jsonObj.id;
  else
    user.id = jsonObj.uuid;

  if (jsonObj.name)
    user.name = jsonObj.name;
  else
  {
    user.name = jsonObj.first_name + " " + jsonObj.last_name;
  }


  if (jsonObj.address)
    user.address = jsonObj.address;
  else
  {
    user.address = {};
    user.address.street = jsonObj.street;
    user.address.coutry = jsonObj.country;
    user.address.zip = jsonObj.postcode;
  }

  user.created_at = jsonObj.created_at;
  user.deleted_at = jsonObj.deleted_at;
  user.last_login = jsonObj.last_login;
  user.updated_at = jsonObj.updated_at;

  return user;
}

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      unseenEmails: false,
      pseudopolisEmails: false,
      mendedDrumEmails: false
    };
  }

  onChange = (event, network) => {
    let reader = new FileReader();

    reader.onloadend = (event) => {
      let lines = event.target.result;
      let data = lines.split("\n");
      data.forEach(function (element) {
        let jsonObj = JSON.parse(element);
        mails[network].push(jsonObj.email);
        zipCodes.push(parseUser(jsonObj).address.zip);
      });
      this.setState({[network]: true});
    };
    reader.readAsText(event.target.files[0]);
    //override bootstrap
    event.target.nextElementSibling.innerHTML = event.target.files[0].name;
  };


  render()
  {
    const isAllImported = this.state.unseenEmails && this.state.pseudopolisEmails && this.state.mendedDrumEmails;
    return (
      <div className="clearfix">
        {!isAllImported ? (
          <div>
            <h2> Import files </h2>
            <Input label={unseen_label} array={Unseen_Emails} callback={this.onChange}/>
            <Input label={pseudopolis_label} array={Pseudopolis_Emails} callback={this.onChange}/>
            <Input label={mended_drum_label} array={Mended_Drum_Emails} callback={this.onChange}/>
          </div>
        ) : (
          <div>
            <UsersCount mails={mails}/>
            <Drawing mails={mails}/>
            <ZipCode zipCodes={zipCodes}/>
          </div>
        )}
      </div>


    )
  }
}