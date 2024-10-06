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
import about from '../../../styles/sections/index/about.module.scss'

/**
 * Section: Technical
 * Highlight your technical skills with a short blurb about you,
 * Then display the programs you are proficient with and the technologies you use if applicable.
 * 
 * @returns {jsx} <Technical />
 */
export default function Technical() {
	return (
		<Section classProp={`${about.section} borderBottom`}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="Technical Expertise"
					preTitle="Skills & Tools"
					subTitle="As an AI engineer and full stack developer, I leverage a wide array of technologies to build innovative solutions that bridge the gap between cutting-edge AI and robust software engineering."
				/>
				<section className={`${about.content} ${about.container}`}>
					<div className={about.copy}>
							<CopyBlock 
								title="AI and Software Synergy"
								icon={[ 'fat', 'brain-circuit' ]}
								copy="With a strong foundation in both AI technologies and full stack development, I bring a unique perspective to every project. I'm constantly exploring new technologies and methodologies to stay at the forefront of the rapidly evolving tech landscape."
								iconClass={about.icon}
								containerClass={about.container}
							/>
							<BadgesBlock 
								title="AI & Machine Learning Tools" 
								copy="My expertise in AI and machine learning allows me to work with a variety of frameworks and tools to develop sophisticated models and applications."
								list={aiTools}
								block="ai" 
								fullContainer="fullContainer"
								icon="robot"
								containerClass={about.container}
								headerIcon={about.icon} 
							/>
							<BadgesBlock 
								title="Development Technologies" 
								copy="From front-end frameworks to back-end systems and cloud platforms, I utilize a comprehensive tech stack to build scalable and efficient applications."
								list={devTech} 
								block="dev"
								fullContainer="fullContainer" 
								icon="code"
								containerClass={about.container}
								headerIcon={about.icon} 
							/>							
					</div>
					<div className={`${about.image} ${about.technicalSvg}`}>
						<Image src="/img/dataism-24.svg" width={477} height={1111} alt="Data Strings 01 by Colorpong: https://ywft.us/2177b695b" />
					</div>
				</section>	
			</Container>
		</Section>
	)
}

const aiTools = [
	{ key: 'python', 		name: 'Python', 			type: 'devicon' },
	{ key: 'tensorflow', 	name: 'TensorFlow', 		type: 'custom' },
	{ key: 'pytorch', 		name: 'PyTorch', 			type: 'devicon' },
	{ key: 'huggingface', 	name: 'HuggingFace', 		type: 'custom' },
	{ key: 'openai', 		name: 'OpenAI GPT', 		type: 'custom' },
	{ key: 'scikit-learn', 	name: 'scikit-learn', 		type: 'devicon' },
	{ key: 'numpy', 		name: 'NumPy', 				type: 'devicon' },
	{ key: 'pandas', 		name: 'Pandas', 			type: 'devicon' },
	{ key: 'jupyter', 		name: 'Jupyter', 			type: 'devicon' },
]

const devTech	= [
	{ key: 'javascript', 	name: 'JavaScript', 		type: 'devicon' },
	{ key: 'typescript', 	name: 'TypeScript', 		type: 'devicon' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'Next.js', 			type: 'devicon' },
	{ key: 'nodejs', 		name: 'Node.js', 			type: 'devicon' },
	{ key: 'express', 		name: 'Express', 			type: 'devicon' },
	{ key: 'mongodb', 		name: 'MongoDB', 			type: 'devicon' },
	{ key: 'postgresql', 	name: 'PostgreSQL', 		type: 'devicon' },
	{ key: 'amazonwebservices', 			name: 'AWS', 				type: 'devicon' },
	{ key: 'docker', 		name: 'Docker', 			type: 'devicon' },
	{ key: 'git', 			name: 'Git', 				type: 'devicon' },
	{ key: 'fastapi', 		name: 'FastAPI', 			type: 'devicon' },
]