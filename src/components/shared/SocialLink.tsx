import { useMemo } from 'react'
import { StreamerProfileSocials } from 'src/utils/entity/StreamerProfile';
import facebookIcon from 'src/assets/icons/socials/facebook.svg'
import instagramIcon from 'src/assets/icons/socials/instagram.svg'
import tiktokIcon from 'src/assets/icons/socials/tiktok.svg'
import twitterIcon from 'src/assets/icons/socials/twitter.svg'
import youtubeIcon from 'src/assets/icons/socials/youtube.svg'

type SocialLinkProps = {
  type: keyof StreamerProfileSocials;
  href: string;
}

const SocialLink = ({type, href}: SocialLinkProps) => {
  const socialIcon = useMemo(() => {
    switch (type) {
      case 'facebook': 
        return facebookIcon;
      case 'instagram': 
        return instagramIcon;
      case 'tikTok': 
        return tiktokIcon;
      case 'twitter': 
        return twitterIcon;
      case 'youtube': 
        return youtubeIcon;

      default:
        return;
    }
  }, [type]);

  return (
    <a href={href}>
      <img src={socialIcon} alt={`social-icon__${type}`} />
    </a>
  )
}

export default SocialLink
