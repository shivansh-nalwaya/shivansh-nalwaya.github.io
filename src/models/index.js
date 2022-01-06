import Mountain from "./mountain";
import SkillPatk from "./skill-park";
import ProjectExhibition from "./project-exhibition";
import CertificateGallary from "./certificate-gallary";

const Models = () => ({
  ...CertificateGallary,
  ...Mountain,
  ...SkillPatk,
  ...ProjectExhibition,
});

export default Models;
