// Core packages
import Image from 'next/image'

// Section structure
import Section from '../../structure/section';
import Container from '../../structure/container';

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import SectionGridBg from '../../blocks/section.grid.block'

// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'

// Section scss
import about from '../../../styles/sections/index/about.module.scss';

/**
 * Section: About
 * An overview of yourself.
 * Highlight your top level attributes and disciplines.
 * 
 * @returns {jsx} <About />
 */
export default function About() {
	return (
		<Section classProp={about.section}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="About Me"
					preTitle="Synopsis"
					subTitle="With a diverse skill set that spans AI engineering, full stack development, and a passion for innovative technologies, I am a versatile software engineer dedicated to pushing the boundaries of what's possible in tech."
				/>
				<section className={about.content}>
					<div className={about.image}>
						{window.innerWidth > 768 && (
							<img src="/img/headshot.jpg" alt="Headshot"/>
						)}
						{/* <Image src="/img/headshot.jpg" width={600} height={800}/> */}
					</div>
					<div className={about.copy} >
						<CopyBlock 
							title="Bridging AI and Software Engineering"
							containerClass={about.container}
							iconClass={about.icon}
							icon={[ 'fat', 'microchip-ai' ]}
							copy="Beyond my technical expertise in AI and software development, I bring strong problem-solving skills and a keen interest in emerging technologies. My experience ranges from developing cutting-edge AI applications to creating robust full-stack solutions. I'm particularly passionate about leveraging AI to solve real-world problems and enhance user experiences."
						/>
						<BadgesBlock 
							title="Core Competencies" 
							containerClass={about.container}
							list={skills} 
							fullContainer="fullContainer"
							block="skills" 
							icon="code"
							copy="My technical toolkit is diverse, encompassing both AI technologies and traditional software development. I enjoy working with various aspects of AI and software engineering, from machine learning models to scalable web applications."
							headerIcon={`${about.icon}`}
						/>
					</div>
				</section>	
			</Container>
		</Section>
	)
}

const skills = [
	{ key: 'brain-circuit', 	name: 'Machine Learning', 	type: 'fad' },
	{ key: 'language', 			name: 'NLP', 				type: 'fad' },
	{ key: 'code', 				name: 'Full Stack Dev', 	type: 'fad' },
	{ key: 'database', 			name: 'Data Engineering', 	type: 'far' },
	{ key: 'cloud', 			name: 'Cloud Computing', 	type: 'fad' },
	{ key: 'project-diagram', 	name: 'System Design', 		type: 'fad' },
]