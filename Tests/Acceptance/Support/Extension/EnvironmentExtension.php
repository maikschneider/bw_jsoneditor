<?php

declare(strict_types=1);

namespace Blueways\BwJsoneditorTest\Acceptance\Support\Extension;

use Codeception\Events;
use Codeception\Extension;

class EnvironmentExtension extends Extension
{
    /**
     * @var array<Events::*, string>
     */
    public static array $events = [
        Events::SUITE_BEFORE => 'beforeSuite',
    ];

    public function beforeSuite(): void
    {
        require_once dirname(__DIR__, 4) . '/vendor/typo3/testing-framework/Resources/Core/Build/UnitTestsBootstrap.php';
    }
}
