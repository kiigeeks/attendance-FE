import React, { useState } from 'react'
import FeeIcon from '../../assets/icons/Fee.svg'
import FeeGrayIcon from '../../assets/icons/Fee-Gray.svg'
import HideIcon from '../../assets/icons/Hide.svg'
import EyeIcon from '../../assets/icons/Eye.svg'

const CardFee = () => {
	const [showPassword, setShowPassword] = useState(false)

    return (
        <>
			<div className="flex flex-col gap-2 flex-1">
				<div className="flex flex-initial text-yellowSecondary text-sm md:text-base font-semibold">
					Gaji
				</div>
				<div className="flex flex-1 items-center gap-5 md:gap-10">
					<div className="flex text-2xl md:text-3xl tracking-wider font-semibold">
						Rp. <span id="salary-label">**********</span>,-
					</div>
					<div className="w-5 md:w-6 h-5 md:h-6 flex justify-self-start cursor-pointer">
						<img
							src={showPassword ? HideIcon : EyeIcon}
							loading='eager'
							alt="password"
							onClick={() => setShowPassword(!showPassword)}
							className="w-full h-full object-contain" />
					</div>
				</div>
			</div>
			<div className="flex flex-initial">
				<img src={FeeGrayIcon} alt="fee" loading='eager' className="w-full h-full object-contain" />
			</div>
        </>
    )
}

export default CardFee