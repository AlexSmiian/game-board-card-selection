import Container from "./components/_ui/Container";
import Logo from "./components/Logo";
import H1 from "./components/_ui/H1/indext.tsx";
import CashCounter from "./components/CashCounter";
import CardWrapper from "./components/CardWrapper";
import CashAnimationLayer from "./components/CashAnimationLayer";
import BombEffect from "./components/BombEffect";
import X2Effect from "./components/X2Effect";
import StopEffect from "./components/StopEffect";
import BombFieldEffect from "./components/BombFieldEffect";
import StopModal from "./components/StopModal";
import BombModal from "./components/BombModal";
import BombSaveModal from "./components/BombSaveModal";
import ClaimButton from "./components/ClaimButton";
import { useSpecialEffectsStore, useGameStore } from "./store/gameStore";

function App() {
    const { bombEffect, x2Effect, stopEffect, bombFieldEffect } = useSpecialEffectsStore();
    const { 
        showStopModal, 
        showBombModal, 
        showBombSaveModal,
        defuseCost,
        saveCost,
        hideStopModalAction,
        hideBombModalAction,
        hideBombSaveModalAction,
        takeHit,
        defuseBomb,
        saveResources,
        loseResources,
        claimRewards,
        newGame,
        counter
    } = useGameStore();
    
    return (
        <Container>
            <Logo/>
            <H1/>
            <CashCounter />
            <CardWrapper />
            <ClaimButton 
                onClaim={claimRewards} 
                disabled={counter === 0}
            />
            <CashAnimationLayer />
            <BombEffect isActive={bombEffect} onComplete={() => {}} />
            <X2Effect isActive={x2Effect} onComplete={() => {}} />
            <StopEffect isActive={stopEffect} onComplete={() => {}} />
            <BombFieldEffect isActive={bombFieldEffect} onComplete={() => {}} />
            
            <StopModal 
                isOpen={showStopModal}
                onClose={hideStopModalAction}
                onClaim={claimRewards}
            />
            
            <BombModal 
                isOpen={showBombModal}
                onClose={hideBombModalAction}
                onTakeHit={takeHit}
                onDefuse={defuseBomb}
                defuseCost={defuseCost}
            />

            <BombSaveModal 
                isOpen={showBombSaveModal}
                onClose={hideBombSaveModalAction}
                onSaveResources={saveResources}
                onLoseResources={loseResources}
                saveCost={saveCost}
            />
        </Container>
    )
}

export default App
