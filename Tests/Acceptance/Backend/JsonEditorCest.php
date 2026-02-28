<?php

declare(strict_types=1);

namespace Blueways\BwJsoneditorTest\Acceptance\Backend;

use Blueways\BwJsoneditorTest\Acceptance\Support\AcceptanceTester;

final class JsonEditorCest
{
    private const EDITOR_SELECTOR = '[data-formengine-input-name="data[tt_content][1][json]"]';
    private const HIDDEN_INPUT_SELECTOR = 'input[type="hidden"][name="data[tt_content][1][json]"]';

    public function _before(AcceptanceTester $I): void
    {
        $I->loginAsAdmin();
    }

    private function openEditorField(AcceptanceTester $I): void
    {
        $I->amOnPage('/typo3/record/edit?edit[tt_content][1]=edit');
        $I->switchToContentFrame();
        $I->waitForElement(self::EDITOR_SELECTOR, 10);
        $I->scrollTo(self::EDITOR_SELECTOR);
        $I->waitForElementVisible(self::EDITOR_SELECTOR, 10);
    }

    public function canSeeJsonEditorContainer(AcceptanceTester $I): void
    {
        $this->openEditorField($I);
        $I->seeElement(self::EDITOR_SELECTOR);
    }

    public function canSeeHiddenInputForJsonField(AcceptanceTester $I): void
    {
        $this->openEditorField($I);
        $I->seeElementInDOM(self::HIDDEN_INPUT_SELECTOR);
    }

    public function canSeeJsonEditorIsInitialized(AcceptanceTester $I): void
    {
        $this->openEditorField($I);
        $I->waitForElementVisible(self::EDITOR_SELECTOR . ' .jse-main', 10);
    }

    public function canSaveJsonValueAndPersistToDatabase(AcceptanceTester $I): void
    {
        $this->openEditorField($I);
        $I->waitForElementVisible(self::EDITOR_SELECTOR . ' .jse-main', 10);

        $I->executeJS(
            'const input = document.querySelector(\'input[name="data[tt_content][1][json]"]\');'
            . 'input.value = \'{"foo":"bar"}\';'
            . 'input.dispatchEvent(new Event("change", { bubbles: true }));'
            . 'TYPO3.FormEngine && TYPO3.FormEngine.Validation && TYPO3.FormEngine.Validation.markFieldAsChanged(input);'
        );

        $I->scrollTo('button[name="_savedok"]');
        $I->click('button[name="_savedok"]');
        $I->wait(2);
        $I->waitForElement(self::EDITOR_SELECTOR, 10);

        $I->canSeeInDatabase('tt_content', ['uid' => 1, 'json' => '{"foo":"bar"}']);
    }

    public function canSeePrefilledValueFromDatabase(AcceptanceTester $I): void
    {
        $I->updateInDatabase('tt_content', ['json' => '{"hello":"world"}'], ['uid' => 1]);

        $this->openEditorField($I);

        $value = $I->grabValueFrom(self::HIDDEN_INPUT_SELECTOR);
        $I->assertEquals('{"hello":"world"}', $value);
    }
}
