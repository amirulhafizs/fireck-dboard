import Input from "components/Input";
import Select from "components/Select";

const services = [
  "126",
  "163",
  "1und1",
  "AOL",
  "DebugMail",
  "DynectEmail",
  "FastMail",
  "GandiMail",
  "Gmail",
  "Godaddy",
  "GodaddyAsia",
  "GodaddyEurope",
  "hot.ee",
  "Hotmail",
  "iCloud",
  "mail.ee",
  "Mail.ru",
  "Maildev",
  "Mailgun",
  "Mailjet",
  "Mailosaur",
  "Mandrill",
  "Naver",
  "OpenMailBox",
  "Outlook365",
  "Postmark",
  "QQ",
  "QQex",
  "SendCloud",
  "SendGrid",
  "SendinBlue",
  "SendPulse",
  "SES",
  "SES-US-EAST-1",
  "SES-US-WEST-2",
  "SES-EU-WEST-1",
  "Sparkpost",
  "Yahoo",
  "Yandex",
  "Zoho",
  "qiye.aliyun",
];

export interface ConfigurationProps {}

const Configuration: React.FC<ConfigurationProps> = () => {
  return (
    <div>
      <div className="font-medium text-22px mb-12 mr-3">Configuration</div>
      <div>
        <div className="mb-12 sm:w-1/2 sm:pr-3">
          <div className="mb-2">Service provider</div>
          <Select
            groundColor="black"
            options={services.map((x) => ({ value: x, label: x }))}
          ></Select>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="mb-12 sm:w-1/2 w-full px-3">
            <div className="mb-2">User</div>
            <Input></Input>
          </div>
          <div className="mb-12 sm:w-1/2 w-full px-3">
            <div className="mb-2">Password</div>
            <Input></Input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
